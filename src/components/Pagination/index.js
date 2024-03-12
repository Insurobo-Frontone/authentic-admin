import React, { useState } from 'react';
import styled from "styled-components";
import Button from '../Button';
import next from '../../assets/icon/paginationNext.png';
import prev from '../../assets/icon/paginationPrev.png';


function Pagination({ postPerPage, totalPosts, paginate }) {
  const [active, setActive] = useState(1);
  const pageNumbers = [];
  


  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  const activeStyle = (n) => {
    paginate(n);
    setActive(n);
  }
  const nextPage = (n) => {
    paginate(n);
    setActive(n);
  }
  return (
    <Nav>
      <ButtonUl>
        <li>
          <Button
            width='50px'
            title={<img src={prev} alt='이전' />}
            theme='light'
          />
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <Button
              width='50px'
              theme={active === number ? 'dark' : 'light'}
              title={number}
              onClick={(n) => activeStyle(number)}
            />
          </li>
        ))}
        <li>
          <Button
            width='50px'
            title={<img src={next} alt='다음'/>}
            theme='light'
          />
        </li>
      </ButtonUl>
      
    </Nav>
  )
}

export default Pagination;

const Nav = styled.div`
  width: 100%;

`;

const ButtonUl = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 40px 0;
  > li {
    margin-right: 8px;
    :last-child {
      margin-right: 0;
    }
  }
`;



