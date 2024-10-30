import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCard(props) {
  console.log("ArtworkCard Test")
  
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
  );

  if (error) return <Error statusCode={404} />;

  if (!data) return null;

  console.log(data)

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={
          data.primaryImageSmall
            ? data.primaryImageSmall
            : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
        }
      />
      <Card.Body>
        <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"}
          <br />
          <strong>Classification: </strong>{data.classification ? data.classification : "N/A"}
          <br />
          <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}
          <br />
          <Link href={`/artwork/${props.objectID}`} passHref legacyBehavior>
            <Button variant="primary">{data.objectID}</Button>
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
