import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../components/Title";
import SelectInput from "../components/Input/SelectInput";
import TextInput from "../components/Input/TextInput";
import Button from "../components/Button";
import CalendarInput from "../components/Input/CalenderInput";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { useFormContext } from "react-hook-form";
import { addDays, addMonths } from "date-fns";
import { useNavigate } from "react-router-dom";
import { getAllList, getKeywordList, getList } from "../api/ApplyListAPI";


const ApplyList = ({ data }) => {
  const { setValue, watch } = useFormContext();
  const [postsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [data, setData] = useState();
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = data?.slice(indexOfFirst, indexOfLast);
  const navigate = useNavigate();
  const keyword = [
    {
      id: '1',
      name: '가입자명',
      value: 'PTYKORNM'
    },
    {
      id: '2',
      name: '상호명',
      value: 'PTYBIZNM'
    },
    {
      id: '3',
      name: '연락처',
      value: 'TELNO'
    },
  ];
  const state = [
    {
      id: '1',
      name: '접수'
    },
    {
      id: '2',
      name: '완료'
    },
  ];

  useEffect(()  => {
    // getList().then((res) => console.log(res))
  }, []);
  

  const setDateRange = (period) => {
    const start = new Date();
    switch (period) {
      case '일주일' :
        setValue('startDate', addDays(start, -7))
        setValue('endDate', start)
        break;
      case '1개월' :
        setValue('startDate', addMonths(start, -1))
        setValue('endDate', start)
        break;
      case '3개월' :
        setValue('startDate', addMonths(start, -3))
        setValue('endDate', start)
        break;
      case '6개월' :
        setValue('startDate', addMonths(start, -6))
        setValue('endDate', start)
        break;
      default :
        break;
    } 
  }


  const searchKeyword = () => {
    

  }
  return (
    <Wrap>
      <Title title='접수 현황' />
      <SearchRange>
        <div>
          <p>키워드</p>
          <div>
            <SelectInput 
              name='keyword'
              placeholder='전체'
              width='182px'
            >
              <>
                {keyword.map((dt) => (
                  <option key={dt.id} value={dt.value}>{dt.name}</option>
                ))}
              </>
            </SelectInput>
            <TextInput name='search' width='482px' />
            <SelectInput
              name='state'
              placeholder='접수상태'
              width='129px'
            >
              <>
                {state.map((dt) => (
                  <option key={dt.id} value={dt.value}>{dt.name}</option>
                ))}
              </>
            </SelectInput>
            <Button 
              title='검색'
              width='67px'
              onClick={() => searchKeyword()}
            /> 
          </div>
        </div>
        <div>
          <p>가입신청일</p>
          <div>
            <div>
              <CalendarInput
                width='182px'
                name='startDate'
                placeholder='선택'
              />
              <span>~</span>
              <CalendarInput
                width='182px'
                name='endDate'
                placeholder='선택'
              />
              <RangeButtonWrap>
                <Button
                  width='67px'
                  title='일주일'
                  theme='dark'
                  onClick={() => setDateRange('일주일')}
                />
                <Button
                  width='67px'
                  title='1개월'
                  theme='dark'
                  onClick={() => setDateRange('1개월')}
                />
                <Button
                  width='67px'
                  title='3개월'
                  theme='dark'
                  onClick={() => setDateRange('3개월')}
                />
                <Button
                  width='67px'
                  title='6개월'
                  theme='dark'
                  onClick={() => setDateRange('6개월')}
                />
              </RangeButtonWrap>
            </div>
          </div>
        </div>
      </SearchRange>
      <ListWrap>
        <TotalCount>총<strong>3</strong> 건</TotalCount>
        <Table>
          <thead>
            <tr>
              <th style={{ width: '47px'}}>No</th>
              <th style={{ width: '102px'}}>가입자명</th>
              <th style={{ width: '223px'}}>상호명</th>
              <th style={{ width: '173px'}}>가입신청일</th>
              <th style={{ width: '190px'}}>사업자번호</th>
              <th style={{ width: '190px'}}>연락처</th>
              <th style={{ width: '101px'}}>접수상태</th>
            </tr>
          </thead>
          <tbody>
            <>
              {currentPosts.map((dt) => (
                <tr onClick={() => navigate(`?id=${dt.id}`)}> 
                  <td>{dt.number}</td>
                  <td>{dt.name}</td>
                  <td style={{ textAlign: 'start' }}>{dt.bizName}</td>
                  <td>{dt.applyDate}</td>
                  <td>{dt.bizNo}</td>
                  <td>{dt.telNo}</td>
                  <td style={{ color: dt.state === '완료' && '#5DA3FF'}}>{dt.state}</td>
                </tr>
              ))}
            </>
          </tbody>      
        </Table>
        <Pagination
          postPerPage={postsPerPage} 
          totalPosts={data.length} 
          paginate={setCurrentPage}
          nextPage={setCurrentPage}
        />
      </ListWrap>
    </Wrap>
  )
}

export default ApplyList;

const Wrap = styled.div`

`;

const SearchRange = styled.div`
  height: 114px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #FAFBFC;
  margin-top: 30px;
  padding: 16px 24px;
  > div {
    display: flex;
    align-items: center;
    > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div {
        display: flex;
        align-items: center;
        > span {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
        }
      }
    }
    > p {
      font-size: 14px;
      font-weight: 500;
      width: 80px;

      
    }
  }
`;

const RangeButtonWrap = styled.div`
  width: 286px;
  display: flex;
  justify-content: space-between;
  margin-left: 14px;
`;


const ListWrap = styled.div`
  margin-top: 30px;
`;

const TotalCount = styled.p`
  font-size: 14px;
  color: #232D39;
  > strong {
    color: #5DA3FF;
    font-weight: 700;
  }
`;
