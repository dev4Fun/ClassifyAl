import request from 'superagent';

const ROOT_URL = "http://localhost:8080";

const IMAGE_PATH = "/image";
const INSTAGRAM_PATH = "/insta";
const IMAGE_URL_PATH = "/image-url";

export function postPicture(pic) {
    return request
        .post(ROOT_URL + IMAGE_PATH)
        .field('image', pic);
}

export function postInstaUrl(url) {
    return request
        .post(ROOT_URL + INSTAGRAM_PATH)
        .send({ 'insta_url': url });
}

export function postImageUrl(url) {
    return request
        .post(ROOT_URL + IMAGE_URL_PATH)
        .send({ 'url': url });
}