import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  CardHeader,
} from "@nextui-org/react";
function ShowImage({ item, url }) {
  return (
    <div className="product-img">
      <img
        src={`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}`}
        alt={item.name}
        className="mb-3 card-img-top"
        style={{
          objectFit: "fill",
          height: "200px",
          overflow: "hidden",
        }}
      />
    </div>
  );
}

// const ShowImage = ({ item, url }) => {
//   return (
//     <Image
//       className="rounded-xl"
//       src={`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}`}
//       style={{
//         overflow: "hidden",
//         objectFit: "cover",
//       }}
//       width="200px"
//       height="200px"
//     />
//   );
// };
export default ShowImage;
