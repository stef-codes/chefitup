import type { NextPage } from "next";
import Link from "next/link";
import { Leaderboard } from "flywheel-leaderboard";



const data = [{ rating: 5, name: "Vegan Chicken" },{ rating: 4, name: "Vegan Beef"}  ]
const NewPage: NextPage = () => {
  return (
    <Leaderboard 
    className='max-w-4xl' //tailwind class (optional)
    theme='amber' //leaderboard theme. see docs for accepted values (optional)
    scoringMetric="rating" //the property you wanna rank your data by (required)
    id="name" //the property you wanna id each item in your data by (required)
    cell1="rating" //the first cell for your board (optional)
    // cell2="github_username" //...
    // cell3="users" //...
    // cell4="twitter_followers" //...
    // cell5="github_stars" //...
    items={data} //the data you wanna use for your board. e.g. db response. (required)
    > 
  </Leaderboard>
   
  );
};

export default NewPage;
