use warp::Filter;
use std::fs::read_to_string;
use std::collections::HashMap;
use std::io::{Read, Write};
use std::hash::Hash;
use std::sync::{Arc, Mutex};
#[tokio::main]
async fn main() {
    let directory: String = std::env::current_dir().unwrap().to_str().unwrap().to_owned();
    let data = if let Ok(mut file) = std::fs::File::open("data.json") {
        let mut json = String::new();
        let _ = file.read_to_string(&mut json);
        serde_json::from_str(&json).unwrap_or(Reviews::new())
    } else {
        Reviews::new()
    };
    let (tx,rx) = tokio::sync::oneshot::channel();
    let mut tx = Arc::new(Mutex::new(Some(tx)));
    let data = Arc::new(Mutex::new(data));
    let filter = {
        let data = data.clone();
        warp::any()
            .and(warp::query::<HashMap<String,String>>())
            .and(warp::path::full())
            .map(move |q: HashMap<_, _>, p: warp::filters::path::FullPath| {
                let review = Review::from_hashmap(q);
                let body = match p.as_str() {
                    "/form.html" => {
                        if let Some(review) = review {
                            let mut data = data.lock().unwrap();
                            data.add(review);
                        }
                        read_to_string(&p.as_str()[1..]).unwrap_or_else(|e| {
                            println!("Error {e}");
                            String::from("form.html")
                        })
                    }
                    "/quit" => {
                        let mut tx = tx.lock().unwrap();
                        let data = data.lock().unwrap();
                        let mut file = std::fs::File::create("data.json").unwrap();
                        file.write_all(serde_json::to_string(&*data).unwrap().as_bytes()).unwrap();
                        if let Some(tx) = tx.take() {
                            tx.send(()).unwrap();
                        }
                        String::from("Server quit successfully.")
                    }
                    "/data"=> {
                        let data = data.lock().unwrap();
                        let json = serde_json::to_string(&*data);
                        json.unwrap()
                    }
                    //add other possible special handling here
                    _ => read_to_string(directory.clone()+&p.as_str()).unwrap_or_else(|e| {
                            println!("Error {e}");
                            String::from("form.html")
                        })
                };
                let mut response = warp::reply::Response::new(body.into());
                match p.as_str().rsplit_once('.') {
                    Some((_, s)) => {
                        response.headers_mut()
                            .insert("Content-Type", str::parse(&("text/".to_owned()+s))
                            .unwrap());
                    }

                    _ => {}
                }
                response
            })
    };
    warp::serve(filter).bind_with_graceful_shutdown(([0,0,0,0],7878),async {
        rx.await.unwrap();
    }).1.await;
}

#[derive(Debug, serde::Serialize, serde::Deserialize, Hash, Clone)]
struct Review {
    name: String,
    accommodation: String,
    roomtype: String,
    revie: String
}

impl Review {
    fn from_hashmap(mut hash_map: HashMap<String, String>) -> Option<Review> {
        Some(Review {
        name: hash_map.remove("name")?,
        accommodation: hash_map.remove("accomodation")?,
        roomtype: hash_map.remove("roomtype")?,
        revie: hash_map.remove("revie")?
        })
    }
}


#[derive(serde::Serialize, serde::Deserialize)]
struct Reviews {
    reviews: HashMap<String,HashMap<String,Vec<Review>>>
}

impl Reviews {
    fn new() -> Self {
        let mut reviews = HashMap::new();
        Reviews {
            reviews
        }
    }

    fn add(&mut self, review: Review) {
        if let Some(hashmap) = self.reviews.get_mut(&review.accommodation) {
            if let Some(vector) = hashmap.get_mut(&review.roomtype) {
                vector.push(review);
            } else {
                let mut vector = Vec::new();
                vector.push(review.clone());
                let _ = hashmap.insert(review.roomtype,vector);
            }
        } else {
            let mut vector = Vec::new();
            vector.push(review.clone());
            let mut hashmap = HashMap::new();
            let _ = hashmap.insert(review.roomtype,vector);
            let _ = self.reviews.insert(review.accommodation,hashmap);
        }
    }
/*
    //probably just going to serialise into a single file for the moment
    fn write_data_to_files(&self) -> Result<(),Box<dyn std::error::Error>> {
        for (ref accommodation, rooms) in self.reviews {
            std::fs::create_dir(accommodation)?;
            for (room, reviews) in rooms {
                let mut file = std::fs::File::create(accommodation.clone() + "/" + &room)?;
                file.write_all(serde_json::to_string(&reviews)?.as_bytes())?;
            }
        }
        Ok(())
    }
*/
}