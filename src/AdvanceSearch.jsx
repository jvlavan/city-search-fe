import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import BacktoHome from "./BacktoHome";
import { Button } from "flowbite-react";
import { BsInfoCircle } from "react-icons/bs";
import {  Modal } from "flowbite-react";
import DetailedCityInfo from "./DetailedCityInfo";
function AdvanceSearch({ cityName }) {
  const [page, setPage] = React.useState(0);
  const [PageLimit, setPagLimit] = useState(1);
  const[pagechanged,setPagechanged]=useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [openModalid, setOpenModalid] = useState(1);
 
 
  //const [cityName, setCityname] = useState("nothingnothing");

  // console.log("From Advance search");
  // console.log(location);
   console.log(`${process.env.BE_URL}/city/name/${cityName}?page=` + page);
  const fetchCities = (page = 0) =>
    axios
      .get(`${process.env.BE_URL}/city/name/${cityName}?page=` + page)
      .then((res) => {
       // console.log(res.headers.get("X-Total-Pages"));
        //console.log(...res.headers);
        console.log("2");
        
        setPagLimit(parseInt(res.headers.get("X-Total-Pages")));
        // console.log(PageLimit);
        return res.data;
      });

  const {
    isPending,
    isError,
    error,
    data,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useQuery({
    queryKey: ["cities", page],
    queryFn: () => fetchCities(page),
    placeholderData: keepPreviousData,
    enabled: true,
  });
  useEffect(() => {
    // if (cityName){
    //   setCityname(cityName);
    //   console.log("1");
    // }
     

    // else
    // setCityname("nothingnothing");
    refetch();
    console.log("fetch 1");
 

  }, [cityName]);
  // useEffect(() => {
  //   if (cityName && cityName.trim().length > 0) {
  //     setPage(0); // Reset to the first page when cityName changes.
  //   }
  // }, [cityName]);


  return (
    <div>
      { isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : data.length == 0 ? (
        <div>"There is no city in this name"</div>
      ) :(
        <div>
          <table>
            {data.map((city, index) => (
              <>
              
                <tr key={index}>
                  <td>{city.name}</td>
                  <td>
                    {" "}
                    <Button
                      className="m-2"
                      onClick={() =>
                      {
                        setOpenModalid(city.id)
                        setOpenModal(true)
                      }
                      }
                    >
                      <BsInfoCircle />
                    </Button>
                  </td>
                </tr>
              </>
            ))}
          </table>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Detailed City Info</Modal.Header>
        <Modal.Body>
   <DetailedCityInfo className="text-black" city_prop_id={openModalid}/>
        </Modal.Body>
      </Modal>
        </div>
      )}
      {(data && !data.length == 0)?(    <>  <span>
        {" "}
        Page: {page + 1} of {PageLimit != 0 ? PageLimit : setPagLimit(1)}
      </span>
      <div className="mt-4 block md:flex justify-center items-center">
        <button
          className="m-4"
          onClick={() => {
            setPage((old) => Math.max(old - 1, 0));
          //  setPagechanged((value)=>!value);
            //setCityname(cityName)
          }}
          disabled={page === 0}
        >
          Previous Page
        </button>
        <button
          className="m-4"
          onClick={() => {
            if (!isPlaceholderData && page <= PageLimit) {
              setPage((old) => old + 1);
             // setPagechanged((value)=>!value);
              //  setCityname(cityName)
            }
          }}
          disabled={isPlaceholderData || page + 1 === PageLimit}
        >
          Next Page
        </button>
      </div></>):(null)}

      {isFetching ? <span> Loading...</span> : <BacktoHome/>}
    </div>
  );
}
export default AdvanceSearch;
