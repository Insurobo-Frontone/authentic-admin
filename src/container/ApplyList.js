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
import { getList } from "../api/ApplyAPI";


const ApplyList = () => {
  const { setValue, watch } = useFormContext();
  const [data, setData] = useState();
  const [postsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  // const indexOfLast = currentPage * postsPerPage;
  // const indexOfFirst = indexOfLast - postsPerPage;
  // const currentPosts = data?.slice(indexOfFirst, indexOfLast);
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

  useEffect(()  => {
    getList({
      page: currentPage,
      per_page: postsPerPage
    }).then((res) => {
      console.log(res)
      setData(res.data.items);
      setMaxPage(res.data.max_page);
    }).catch((e) => {
      console.log(e)
    })
  }, [currentPage]);


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

  const nextViewDetail = (uuid, memberNo, quqteNo) => {
    navigate(`/admin/detailView`, {
      state: {
        UUID: uuid,
        QUOTE_NO: quqteNo
      }
    })
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
              <th style={{ width: '325px'}}>상호명</th>
              <th style={{ width: '173px'}}>가입신청일</th>
              <th style={{ width: '190px'}}>사업자번호</th>
              <th style={{ width: '190px'}}>연락처</th>
            </tr>
          </thead>
          <tbody>
            <>
              {data?.map((dt) => (
                <tr onClick={() => nextViewDetail(dt.uuid, dt.MEMBER_NO, dt.QUOTE_NO)}> 
                  <td>1</td>
                  <td>{dt.IN101TR.PTYKORNM}</td>
                  <td style={{ textAlign: 'start' }}>{dt.IN101TR.PTYBIZNM}</td>
                  <td>{dt.IN101TR.INSERT_DATE?.substring(0, 10).replace(/-/g, '.')}</td>
                  <td>{dt.IN101TR.BIZNO?.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')}</td>
                  <td>{dt.IN101TR.TELNO?.replace(/[^0-9]/g, '').replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g, "$1-$2-$3")}</td>
                </tr>
              ))}
            </>
          </tbody>      
        </Table>
        <Pagination
          totalPage={maxPage} 
          paginate={setCurrentPage}
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
      > :nth-child(2) {
        margin: 0 10px 0 16px;

      }
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
