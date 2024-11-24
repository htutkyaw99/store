import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import DetailsCard from "../../components/DetailsCard";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function getDetails() {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        console.log(res.data.product);
        setProduct(res.data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    if (id) {
      getDetails();
    }
  }, [id]);

  return (
    <div>
      <DetailsCard {...product} />
    </div>
  );
};

export default Details;
