import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Card, Row, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import { Pagination } from "react-bootstrap";
import Error from "next/error";

const PER_PAGE = 12;

export default function Artwork() {
  const router = useRouter();
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);

  console.log("ARTWORK INDEX");
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  useEffect(() => {
    if (data) {
      const results = [];
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  const previousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const nextPage = () => {
    if (page < artworkList.length) setPage((prevPage) => prevPage + 1);
  };

  if (error) return <Error statusCode={404} />;
  if (!artworkList) return null;

  return (
    <>
      {artworkList.length > 0 && data ? (
        <Row className="gy-4">
          {artworkList[page - 1].map((ObjectID) => (
            <Col lg={3} key={ObjectID}>
              <ArtworkCard objectID={ObjectID} />
            </Col>
          ))}
        </Row>
      ) : (
        <Col>
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>
              Try searching for something else.
            </Card.Body>
          </Card>
          <br />
          <br />
        </Col>
      )}

      {artworkList.length > 0 &&  (
        <Row className="mt-4">
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} disabled={page === 1} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}
