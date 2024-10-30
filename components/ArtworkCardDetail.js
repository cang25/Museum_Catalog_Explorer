import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useSWR from "swr";
import Link from "next/link";


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCard(props) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
  );

  if (error) return <Error statuscode={404} />;

  if (data) {
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
          <Card.Title>Title: {data.title ? data.tile : "N/A"}</Card.Title>
          <Card.Text>
            <strong>Date: </strong> {data.objectDate ? data.objectDate : "N/A"}
            <br />
            <strong>Classification: </strong> {data.classification ? data.classification : "N/A"}
            <br />
            <strong>Art Medium: </strong> {data.medium ? data.medium : "N/A"}
            <br />
            <br />
            {data.artistDisplayName
              ? data.artistDisplayName &&
                data.artistWikiData_URL && (
                  <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                    wiki
                  </a>
                )
              : "N/A"}
            <br />
            <strong>Credit Line:</strong> {data.creditLine}
            <br />
            <strong>Dimensions: </strong>{data.dimensions}
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
