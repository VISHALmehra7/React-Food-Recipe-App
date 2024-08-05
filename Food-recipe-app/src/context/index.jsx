import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setloading] = useState(false);
  const [recipeList, setrecipeList] = useState([]);
  const [recipeDetailsData, setrecipeDetailsData] = useState(null);
  const [favouritesList, setfavouritesList] = useState([]);

  const navigate = useNavigate()
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setloading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await res.json();
      if (data?.data?.recipes) {
        setrecipeList(data?.data?.recipes);
        setloading(false);
        setSearchParam("");
        navigate('/')
      }
      console.log(data);
    } catch (e) {
      console.log(e);
      setloading(false);
      setSearchParam("");
    }
  }

function handleAddToFavourite(getCurrentItem) {
  console.log(getCurrentItem)
  let cpyFavouritesList = [...favouritesList]
  const index = cpyFavouritesList.findIndex(item => item.id===getCurrentItem.id)
  if(index ===-1){
    cpyFavouritesList.push(getCurrentItem)
  }
  else{
    cpyFavouritesList.splice(index,1)
  }
  setfavouritesList(cpyFavouritesList)
}
console.log('Fav', favouritesList)
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        recipeList,
        loading,
        recipeDetailsData,
        setrecipeDetailsData,
        handleAddToFavourite,
        favouritesList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
