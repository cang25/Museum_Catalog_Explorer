import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import useSWR from "swr";
import Error from "next/error";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react";

export default function ArtworkCardDetail(props) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const [artAdded, setArtAdded] = useState(false);

  useEffect(() => {
    setArtAdded(favouritesList?.includes(props.objectID));
  }, [favouritesList]);

  const { data, error } = useSWR(
    props.objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
      : null
  );

  if (error) return <Error statuscode={404} />;

  if (data === null || data === undefined) return null;

  function favouritesClicked() {
    if (artAdded) {
      setFavouritesList((current) =>
        current.filter((fav) => fav != props.objectID)
      );
      console.log("REMOVED");
      console.log(favouritesList);
      setArtAdded(false);
    } else {
      setFavouritesList((current) => [...current, props.objectID]);
      setArtAdded(true);
      console.log("ADDED");
      console.log(favouritesList);
    }
  }

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
          {data.artistDisplayName ? (
            <>
              {data.artistDisplayName}{" "}
              <a
                href={data.artistWikidata_URL}
                target="_blank"
                rel="noreferrer"
              >
                wiki
              </a>
            </>
          ) : (
            "N/A"
          )}
          <br />
          <strong>Credit Line:</strong> {data.creditLine}
          <br />
          <strong>Dimensions: </strong>
          {data.dimensions}
          <br />
          <br />
          <Button
            onClick={favouritesClicked}
            variant={artAdded ? "primary" : "outline-primary"}
          >
            {artAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
