import React, { useContext } from 'react'
import { GlobalContext } from '../../context'
import RecipeItem from '../../components/RecipeItem'

const Home = () => {
    const {recipeList,loading} = useContext(GlobalContext)
  return (
    <div className='py-8 container mx-auto flex flex-wrap justify-center gap-10'>
        {
            recipeList && recipeList.length >0 ?
            recipeList.map((item)=> <RecipeItem item={item}/>)
            : <div>
                <p className='lg:text-4xl text-xl text-center text-black font-extrabold'>No Recipe To Show.  Please Search Something</p>
            </div>
        }
    </div>
  )
}

export default Home