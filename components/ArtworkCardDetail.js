import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useSWR from "swr";
import Link from "next/link";
import Error from "next/error";

export default function ArtworkCardDetail(props) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
  );

  if (error) return <Error statuscode={404} />;

  if (data === null || data === undefined) return null;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={
          data.primaryImage
            ? data.primaryImage
            : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
        }
      />
      <Card.Body>
        <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
        <Card.Text>
          <strong>Date: </strong> {data.objectDate ? data.objectDate : "N/A"}
          <br />
          <strong>Classification: </strong>{" "}
          {data.classification ? data.classification : "N/A"}
          <br />
          <strong>Art Medium: </strong> {data.medium ? data.medium : "N/A"}
          <br />
          <br />
          <strong>Artist: </strong>{" "}
          {data.artistDisplayName ? data.artistDisplayName : "N/A"}{" "}
          <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">
            wiki
          </a>
          <br />
          <strong>Credit Line:</strong> {data.creditLine}
          <br />
          <strong>Dimensions: </strong>
          {data.dimensions}
          <br />
          <br />
          <Link href={`/artwork/${props.objectID}`} passHref legacyBehavior>
            <Button variant="primary">{data.objectID}</Button>
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
