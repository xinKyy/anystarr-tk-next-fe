// let host = "http://localhost:5997";
let host = `https://anystarr.com/anystarr-new-web`;
// let host = "https://anystarr.com/anystarr-new-web";

if (window.location.href.includes("anystarr.shop")){
  host = `https://anystarr.shop/anystarr-new-web`;
}

export default host;
