import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useSWR from "swr";
import Link from "next/link";

export default function ArtworkCard(props) {
  console.log("ArtworkCard Test");

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
  );

  if (error) return <p>Oops! Artwork currently unavailable.</p>;

  if (data != null || data != undefined) {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={
            data.primaryImageSmall
              ? data.primaryImageSmall
              : "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
          }
        />
        <Card.Body>
          <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>
            {data.objectDate ? data.objectDate : "N/A"}
            <br />
            <strong>Classification: </strong>
            {data.classification ? data.classification : "N/A"}
            <br />
            <strong>Medium: </strong>
            {data.medium ? data.medium : "N/A"}
            <br />
            <br />
            <Link href={`/artwork/${props.objectID}`} passHref legacyBehavior>
              <Button variant="primary">{data.objectID}</Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
}
