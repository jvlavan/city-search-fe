import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import BacktoHome from "./BacktoHome";

function DetailedCityInfo({city_prop_id}) {
  let bgcolor='white';
  const location = useLocation();
  const city_id =(location.state)? location.state.city_location_id:city_prop_id;
 if(!location.state)
  bgcolor='black'
  console.log(location);
  console.log(`${process.env.BE_URL}/city/id/${city_id}`);
  const fetchCities = () =>
    axios
      .get(`${process.env.BE_URL}/city/id/${city_id}`)
      .then((res) => {
console.log(res.data)
        return res.data;
      });

  const { isPending, isError, error, data, isFetching } =
    useQuery({
      queryKey: ["cities"],
      queryFn: () => fetchCities(),
      placeholderData: keepPreviousData,
    });

  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : data.length==0?(<div>
        "There is no city in this name"
      </div>):(
        <div>
            <table className={`text-${bgcolor}`}>
                
            <tr><td>Name:</td><td>{data.name}</td></tr>
            <tr><td>ID:</td><td>{data.id}</td></tr>
            <tr><td>State ID:</td><td>{data.state_id}</td></tr>
            <tr><td>State Code:</td><td>{data.state_code}</td></tr>
            <tr><td>Country ID:</td><td>{data.country_id}</td></tr>
            <tr><td>Country Code:</td><td>{data.country_code}</td></tr>
            <tr><td>Latitude:</td><td>{data.latitude}</td></tr>
            <tr><td>Longitude:</td><td>{data.longitude}</td></tr>
            <tr><td>Created At:</td><td>{data.created_at}</td></tr>
            <tr><td>Updated At:</td><td>{data.updated_at}</td></tr>
            <tr><td>Flag:</td><td>{data.flag}</td></tr>
            <tr><td>Wiki Data ID:</td><td>{data.wikidataid}</td></tr>
            {console.log(data)}
            </table>
        </div>
      )}



      {isFetching ? <span className={`text-${bgcolor}`}> Loading...</span> : null}
      <BacktoHome/>
    </div>
  );
}
export default DetailedCityInfo;
