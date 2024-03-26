import React from "react";
import styled from "styled-components";

const Table = ({ children }) => {
  return (
    <Wrap>
      {children}
    </Wrap>
  )
}
export default Table;


const Wrap = styled.table`
  margin-top: 11px;
  border-top: 1px solid #EAECEF;

  tr {
    border-bottom: 1px solid #EAECEF;
    > th:first-child  {
      border-left: 0;
    }
    > th:last-child {
      border-right: 0;
    }
  }
  th {
    background-color: #FAFBFC;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    vertical-align: middle;
    height: 37px;
    border: 1px solid #EAECEF;
  }
  td {
    text-align: center;
    vertical-align: middle;
    height: 36px;
    font-weight: 200;
    font-size: 14px;
    padding: 0 24px;
  }
  .primary_txt {
    color: #5DA3FF;
  }
  .exception_txt {
    color: #FF0000;
  }
`;
