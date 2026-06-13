import LoadingDialog from "../../Shared/components/LoadingDialog";
import { useEffect, useRef, useState } from "react";

import "./accountchanges.css"
import { GetCities_Service, GetCountries_Service, GetSubdivisions_Service, UpdateCity_Service } from "../services/UserServices";

interface Props{
    show: boolean;
    onClose: () => void;
}

type Country = {
    country_id: number;
    country_name: string;
};

type Region = {
    subd_id: number;
    subd_name: string;
};

type City = {
    city_id: number;
    city_name: string;
};

const EditCityCountry = ( { show, onClose }:Props ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [dialog, setDialog] = useState("");
    const [msg, setMsg] = useState("");

    const [countries, setCountries] = useState<Country[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");

    
    useEffect(() => {
        if(show){
            dialogRef.current?.showModal();
        } else{        
            dialogRef.current?.close();
        }
    });
    
    // CLOSE THE DIALOG
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);


    // COUNTRIES
    useEffect(() => {
        if (!show) return;
        setCountry("");
        setRegion("");
        setCity("");
        const loadCountries = async() =>{
            try{
                const countries = await GetCountries_Service();
                setCountries(countries);
            } catch(err: any){
                console.log(err);
            }
        };

        loadCountries();
    }, [show]);

    // REGIONS / SUBS
    useEffect(() => {
        if (!country) return;
        const loadRegions = async() =>{
            try{
                const regions = await GetSubdivisions_Service(country);
                setRegions(regions);
            } catch(err: any){
                console.log(err);
            }
        }

        loadRegions();
    }, [country]);

    // CITIES
    useEffect(() => {
        if (!region) return;
        const loadCities = async() =>{
            try{
                const cities = await GetCities_Service(region);
                setCities(cities);
            } catch(err: any){
                console.log(err);
            }
        }

        loadCities();
    }, [region]);



    const handle_CCUpdate = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        setDialog("Loading");
        try{
            const update = await UpdateCity_Service(city)

            if (update){
                setMsg("");
                setDialog("Success");

                setTimeout(() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("location");

                    localStorage.setItem("user", JSON.stringify(update.user));
                    localStorage.setItem("location", JSON.stringify(update.location));
                    window.location.reload();
                }, 1000);

            } else{
                setMsg("Something went wrong.");
                setDialog("Failed");
            }

        } catch(err : any){
            setMsg("Something went wrong.");
            setDialog("Failed");
            console.log(err);
        }
    }


    return(
        <>
            <dialog className="Account_Changes" ref={dialogRef}>
                <h3>Update City/Country</h3>
                <form onSubmit={handle_CCUpdate}>
                    <div>
                        <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option value="">Select a Country</option>
                            {countries.map((country) => (
                                <option key={country.country_id} value={country.country_id}>
                                    {country.country_name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            disabled={!country}
                        >
                            <option value="">Select a subdivision</option>
                            {regions.map((region) => (
                                <option key={region.subd_id} value={region.subd_id}>
                                    {region.subd_name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            disabled={!region || !country}
                        >
                            <option value="">Select a City</option>
                            {cities.map((city) => (
                                <option key={city.city_id} value={city.city_id}>
                                    {city.city_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button onClick={handle_CCUpdate} disabled={!city}> Save </button>
                </form>
            </dialog>
            <LoadingDialog modus={dialog} onClose={() => setDialog("")} msg={msg}/>
        </>
    )
}

export default EditCityCountry;