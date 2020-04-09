import React from 'react';
import styled from 'styled-components';



const Item = ({index, handleSelect, id,name,text, purchasedItems}) => {

const selectFirstref = React.useRef(null);
React.useEffect(() => {
    if(index === 0) {
    selectFirstref.current.focus();
}
}, []);

return (
<MainBtn ref={selectFirstref} onClick={handleSelect}>

<div>
    <div>{name}</div>
    <div>{text}</div>
</div>
<ValueDiv>
    Owned: {purchasedItems[id]}
</ValueDiv>
</MainBtn>)
}

export default Item;

const MainBtn = styled.button`
display: flex;
padding: 20px;
justify-content: space-evenly;
`
const ValueDiv = styled.div`

font-size: 20px;


`