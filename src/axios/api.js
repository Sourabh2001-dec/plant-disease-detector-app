import AxiosInstance from "./instance";

let API = {};

API.predict = async (image) => {
  console.log("Image -> ", image);
  const formData = new FormData();
  formData.append("image", {
    uri: image,
    type: "image/jpeg",
    name: "image.jpg",
  });
  return AxiosInstance.post("upload", formData);
};

export default API;
