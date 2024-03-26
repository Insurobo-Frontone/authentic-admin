import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useReactToPrint } from 'react-to-print';
import Title from "../components/Title";
import Table from "../components/Table";
import Button from "../components/Button";
import ConfirmTemplate from "../components/Print/ConfirmTemplate";
import { useNavigate } from "react-router-dom";

const ApplyDetail = ({ data }) => {
  const navigate = useNavigate();
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <>
      {data && (
        <Wrap>
          <Title title='가입자 정보 상세'/>
          <h3>1. 가입자 정보</h3>
          <Table>
            <tr>
              <th style={{ width: '148px'}}>가입자명</th>
              <td style={{ width: '365px'}}>{data.PTYKORNM}</td>
              <th style={{ width: '148px'}}>연락처</th>
              <td style={{ width: '365px'}}>{data.TELNO?.replace(/[^0-9]/g, '').replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g, "$1-$2-$3")}</td>
            </tr>
            <tr>
              <th>사업자번호</th>
              <td>{data.BIZNO?.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')}</td>
              <th>생년월일</th>
              <td>{data.INR_BIRTH}</td>
            </tr>
            <tr>
              <th>성별</th>
              <td>{data.INR_GENDER === '2' ? '여' : '남'}</td>
              <th>마케팅 동의여부</th>
              <td 
                className={data.IN011TR.TERMSA_7 === 'Y' ? 'primary_txt' : 'exception_txt'}
              >
                {data.IN011TR.TERMSA_7 === 'Y' ? '동의' : '미동의'}
              </td>
            </tr>
          </Table>
          <h3>2. 사업장 정보</h3>
          <Table>
            <tr>
              <th style={{ width: '148px'}}>상호명</th>
              <td style={{ width: '365px'}}>{data.PTYBIZNM}</td>
              <th style={{ width: '148px'}}>사업장 주소</th>
              <td style={{ width: '365px'}}>{data.OBJADDR1}</td>
            </tr>
            <tr>
              <th>업종</th>
              <td>{data.LOBZCD}</td>
              <th>사업장 층</th>
              <td>{data.BLDFLOORS1}/{data.BLDFLOORS2}</td>
            </tr>
            <tr>
              <th>임차여부</th>
              <td></td>
              <th>전체층수</th>
              <td>{data.BLDTOTLYRNUM}</td>
            </tr>
            <tr>
              <th>면적</th>
              <td>{data.HSAREA}㎡</td>
              <th>건물 구조정보</th>
              <td></td>
            </tr>
            <tr>
              <th>상시근로자수</th>
              <td></td>
              <th>연평균매출액</th>
              <td style={{ textAlign: 'end'}}>300만원</td>
            </tr>
          </Table>
          <h3>3. 보험정보</h3>
          <Table>
            <tr>
              <th style={{ width: '148px'}}>보험료</th>
              <td style={{ width: '365px'}}>원</td>
              <th style={{ width: '148px'}}>상품명</th>
              <td style={{ width: '365px'}}>풍수해보험</td>
            </tr>
          </Table>
          <h3>4. 담당자 정보</h3>
          <Table>
            <tr>
              <th style={{ width: '148px'}}>성명</th>
              <td style={{ width: '365px'}}>서한나</td>
              <th style={{ width: '148px'}}>사번</th>
              <td style={{ width: '365px'}}>24021403</td>
            </tr>
            <tr>
              <th>소속</th>
              <td>소속명 노출</td>
            </tr>
          </Table>
          <ButtonWrap>
            <Button title='목록보기' theme='dark' width='101px' onClick={() => navigate(-1)}/>
            <Button title='가입확인서 출력' width='141px' onClick={handlePrint}/>
          </ButtonWrap>
          
          <PrintWrap ref={printRef}>
            <ConfirmTemplate />
          </PrintWrap>
        </Wrap>
      )}
    </>
  )
}

export default ApplyDetail;

const Wrap = styled.div`
  > h3 {
    font-size: 14px;
    padding-top: 30px;
    padding-bottom: 10px;
  }

`;

const ButtonWrap = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  width: 256px;
`;

const PrintWrap = styled.div``;