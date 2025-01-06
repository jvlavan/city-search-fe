import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import BacktoHome from "./BacktoHome";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router";
import { BsInfoCircle } from "react-icons/bs";
function BCitySearch() {
  const [page, setPage] = React.useState(0);
  const [PageLimit, setPagLimit] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const city_name = location.state.city_name;
  console.log("From basic search");
  console.log(location);
  console.log(`${process.env.BE_URL}/city/name/${city_name}?page=` + page);
  const fetchCities = (page = 0) =>
    axios
      .get(`${process.env.BE_URL}/city/name/${city_name}?page=` + page)
      .then((res) => {
        console.log(res.headers.get("X-Total-Pages"));
        console.log(...res.headers);
        setPagLimit(parseInt(res.headers.get("X-Total-Pages")));
        console.log(PageLimit);
        return res.data;
      });

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["cities", page],
      queryFn: () => fetchCities(page),
      placeholderData: keepPreviousData,
    });

  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : data.length == 0 ? (
        <div>"There is no city in this name"</div>
      ) : (
        <div>
          <table>
            {data.map((city, index) => (
              <>
                <tr key={index}>
                  <td>{city.name}</td>
                  <td> <Button className="m-2" onClick={() => navigate("/detailed-city-info", { state: { city_location_id: city.id } })}><BsInfoCircle/></Button></td>
                 
                </tr>
              </>
            ))}
          </table>
        </div>
      )}
      {(data && !data.length==0)?(      <>
      <span>
        {" "}
        Page: {page + 1} of {PageLimit != 0 ? PageLimit : setPagLimit(1)}
      </span>
      <div className="mt-4 block md:flex justify-center items-center">
      <button
      className="m-4"
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
      className="m-4"
        onClick={() => {
          if (!isPlaceholderData && page <= PageLimit) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPlaceholderData || page + 1 === PageLimit}
      >
        Next Page
      </button>
      </div>
      </>):(null)}

      {isFetching ? <span> Loading...</span> : null}
      <BacktoHome />
    </div>
  );
}
export default BCitySearch;
