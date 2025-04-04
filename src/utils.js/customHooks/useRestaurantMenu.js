import { useEffect, useState } from "react";
import { MENU_URL } from "../constants";

const useRestaurantMenu = (redId) => {
    const [ resInfo, setResInfo ] = useState(null)
    // fetch data

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        const data = await fetch(MENU_URL + redId + "&catalog_qa=undefined&submitAction=ENTER");
        const json = await data.json()
        setResInfo(json.data)
    }
    
    return resInfo;
}

export default useRestaurantMenu;