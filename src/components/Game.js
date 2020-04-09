import React from 'react';
import styled from 'styled-components';
import useInterval from '../hooks/use-interval.hook'

import cookieSrc from '../cookie.svg';
import Item from './Item';

const items = [
  { id: 'cursor', name: 'Cursor', cost: 10, value: 1, text: "Cost: 10 cookie(s). Produces 1 cookies.second" },
  { id: 'grandma', name: 'Grandma', cost: 100, value: 10, text: "Cost: 100 cookie(s). Produces 10 cookies.second" },
  { id: 'farm', name: 'Farm', cost: 1000, value: 80, text: "Cost: 1000 cookie(s). Produces 80 cookies.second"},
];



const calculateCookiesPerTick = (purchasedItems) => {
      let total = 0;
console.log(purchasedItems)
  items.forEach(item => {
    total += purchasedItems[item.id]*item.value;
  });

  return total;

}





const Game = () => {
  const [numCookies, setNumCookies] = React.useState(100);
  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  })
  //event listeners for spacebar:

  const handleSpace = (event) => {

    if(event.code === 'Space') {
      setNumCookies(numCookies + 1)
    }
  
  };

React.useEffect(() => {
  window.addEventListener('keydown', handleSpace);
  return () => {
    window.removeEventListener('keydown', handleSpace);
  }
});

  //


  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numOfGeneratedCookies + numCookies);
    
      ;
  }, 1000);





  //document title.
  React.useEffect(() => {
    document.title = `${numCookies} Cookies Clicker`;
    return () => {
    document.title =`Cookie Clicker`;
    };
  },[numCookies]);


  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>
          {
            calculateCookiesPerTick(purchasedItems) //to render on the screen
          }  
          </strong> cookies per second
        </Indicator>
        <Button onClick={() => {
          setNumCookies(numCookies+100)
        }}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {
          items.map((item, index) => {
            return <Item index={index}
              handleSelect = {() => 
              {if(numCookies > item.cost) {
                setPurchasedItems({...purchasedItems, [item.id] :purchasedItems[item.id] + 1})
                setNumCookies(numCookies - item.cost)
              }
                else {
                  window.alert(`You cannot afford a ${item.id}!`)
                }
              }}
              //end of function
              purchasedItems={purchasedItems} id={item.id} name={item.name}text={item.text}/>
          })
        }
      </ItemArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

export default Game;
