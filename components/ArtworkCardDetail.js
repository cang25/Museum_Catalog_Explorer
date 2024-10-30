import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCard(objectID) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
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
          <Card.Title>{data.title ? data.tile : "N/A"}</Card.Title>
          <Card.Text>
            {data.objectDate ? data.objectDate : "N/A"}
            <br />
            {data.classification ? data.classification : "N/A"}
            <br />
            {data.medium ? data.medium : "N/A"}
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
            {data.creditLine}
            <br />
            {data.dimensions}
            <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
              <Button variant="primary">{data.objectID}</Button>
            </Link>
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
}
