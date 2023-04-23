import React, { useState } from "react";

import {
  TransferDirection,
  TransferDirectionsTypes,
  TransferProps,
  TransferStatusTypes,
} from "@/typings";
import {
  Container,
  Card,
  CardHeader,
  HeaderAction,
  CardBody,
  ListContent,
  EmptyData,
  TransferActionButtons,
  TransferButton,
  SearchContainer,
  SearchInput,
  FormControl,
  Input,
} from "./style/styled";

const Transfer = ({
  dataSource,
  titles,
  operations,
  showSearch,
  onSearch,
  status,
  width,
  height,
}: TransferProps) => {
  const [sourceData, setSourceData] = useState<any>(dataSource);
  const [targetData, setTargetData] = useState<any>([]);

  const [leftSelectData, setLeftSelectData] = useState<any>([]);
  const [rightSelectData, setRightSelectData] = useState<any>([]);

  const [sourceSelectAll, setSourceSelectAll] = useState<any>(false);
  const [targetSelectAll, setTargetSelectAll] = useState<any>(false);

  const [sourceDataSearch, setSourceDataSearch] = useState("");

  const selectLeftItemHandle = (e: any) => {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked) {
      setLeftSelectData([...leftSelectData, value]);
    } else {
      const index = leftSelectData.indexOf(value);
      const newSelectDatas = [
        ...leftSelectData.slice(0, index),
        ...leftSelectData.slice(index + 1),
      ];
      setLeftSelectData(newSelectDatas);
    }
  };

  const selectRightItemHandle = (e: any) => {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked) {
      setRightSelectData([...rightSelectData, value]);
    } else {
      const index = rightSelectData.indexOf(value);
      const newSelectDatas = [
        ...rightSelectData.slice(0, index),
        ...rightSelectData.slice(index + 1),
      ];
      setRightSelectData(newSelectDatas);
    }
  };

  const sourceToTargetTransfer = () => {
    const filteredObjects = sourceData.filter((obj: any) =>
      leftSelectData.includes(obj.key)
    );
    setTargetData([...targetData, ...filteredObjects]);
    setSourceData(
      sourceData.filter((obj: any) => !leftSelectData.includes(obj.key))
    );
    setLeftSelectData([]);
  };

  const TargetToSourceTransfer = () => {
    const filteredObjects = targetData.filter((obj: any) =>
      rightSelectData.includes(obj.key)
    );
    setSourceData([...sourceData, ...filteredObjects]);
    setTargetData(
      targetData.filter((obj: any) => !rightSelectData.includes(obj.key))
    );
    setRightSelectData([]);
  };

  const selectDataAll = (direction: TransferDirectionsTypes) => {
    if (direction === TransferDirectionsTypes.SOURCE) {
      if (sourceSelectAll) {
        setLeftSelectData([]);
        setSourceSelectAll(false);
      } else {
        const keys = sourceData.map((item: any) => item.key);
        setLeftSelectData(keys);
        setSourceSelectAll(true);
      }
    } else {
      if (targetSelectAll) {
        setRightSelectData([]);
        setTargetSelectAll(false);
      } else {
        const keys = targetData.map((item: any) => item.key);
        setRightSelectData(keys);
        setTargetSelectAll(true);
      }
    }

    // Checkbox update status
    const sourceChecked =
      direction === TransferDirectionsTypes.SOURCE
        ? !sourceSelectAll
        : sourceData.every(
            (item: any) =>
              leftSelectData.findIndex((a: any) => a === item.key) !== -1 ||
              rightSelectData.findIndex((a: any) => a === item.key) !== -1
          );
    const targetChecked =
      direction === TransferDirectionsTypes.TARGET
        ? !targetSelectAll
        : targetData.every(
            (item: any) =>
              rightSelectData.findIndex((a: any) => a === item.key) !== -1
          );

    setSourceSelectAll(sourceChecked);
    setTargetSelectAll(targetChecked);
  };

  const searchHandleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(TransferDirection.left, e.target.value);
    setSourceDataSearch(e.target.value);
  };

  const searchHandleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(TransferDirection.right, e.target.value);
    setSourceDataSearch(e.target.value);
  };

  const borderStatus = () => {
    switch (status) {
      case TransferStatusTypes.error:
        return "#ff4d4f";
        break;
      case TransferStatusTypes.warning:
        return "#faad14";
        break;
      case TransferStatusTypes.success:
        return "#1ba108";
        break;
      default:
        return "#d9d9d9";
        break;
    }
  };

  return (
    <Container>
      <Card
        css={{
          borderColor: borderStatus(),
        }}
      >
        <CardHeader>
          <HeaderAction>
            <Input
              type="checkbox"
              onChange={() => selectDataAll(TransferDirectionsTypes.SOURCE)}
              checked={
                sourceData.length > 0 &&
                sourceData.every(
                  (item: any) =>
                    leftSelectData.findIndex((a: any) => a === item.key) !==
                      -1 ||
                    rightSelectData.findIndex((a: any) => a === item.key) !== -1
                )
              }
            />
            <div>
              {leftSelectData.length > 0 && `${leftSelectData.length}/`}
              {sourceData.length} items
            </div>
          </HeaderAction>
          <div>{titles[0]}</div>
        </CardHeader>

        <CardBody
          css={{
            width: width ? width : "220px",
            height: height ? height : "240px",
          }}
        >
          {showSearch && (
            <SearchContainer>
              <FormControl>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0178 11.1912L9.51939 8.69333C10.2644 7.76393 10.6697 6.60791 10.668 5.41675C10.668 2.51875 8.31597 0.166748 5.41797 0.166748C2.51997 0.166748 0.167969 2.51875 0.167969 5.41675C0.167969 8.31475 2.51997 10.6667 5.41797 10.6667C6.60914 10.6684 7.76515 10.2632 8.69455 9.51816L11.1924 12.0166L12.0178 11.1912ZM9.50195 5.41679C9.50362 6.47871 9.09019 7.49922 8.34987 8.26054L8.26237 8.34804C7.50105 9.08835 6.48054 9.50179 5.41862 9.50012C3.16229 9.50012 1.33529 7.67254 1.33529 5.41679C1.33529 3.16046 3.16229 1.33346 5.41862 1.33346C7.67437 1.33346 9.50195 3.16046 9.50195 5.41679Z"
                    fill="#313131"
                  />
                </svg>
                <SearchInput
                  placeholder="Search here"
                  onChange={(e: any) => searchHandleSourceChange(e)}
                />
              </FormControl>
            </SearchContainer>
          )}

          {sourceData.length > 0 ? (
            sourceData &&
            sourceData
              .filter(
                (data: any) =>
                  data.title.toLowerCase().includes(sourceDataSearch) ||
                  data.description.toLowerCase().includes(sourceDataSearch)
              )
              .map((item: any) => (
                <ListContent key={item.key} id={item.key}>
                  <Input
                    id={item.key}
                    onChange={(e: any) => selectLeftItemHandle(e)}
                    type="checkbox"
                    value={item.key}
                    checked={
                      !!leftSelectData.find((a: any) => a === item.key)
                        ? true
                        : false
                    }
                  />
                  <span>{item.title}</span>
                </ListContent>
              ))
          ) : (
            <EmptyData>No Data</EmptyData>
          )}
        </CardBody>
      </Card>

      <TransferActionButtons>
        <TransferButton
          disabled={leftSelectData.length < 1 ? true : false}
          onClick={() => sourceToTargetTransfer()}
          css={{
            cursor: leftSelectData.length < 1 ? "not-allowed" : "pointer",
            backgroundColor:
              leftSelectData.length < 1 ? "#EDEDED" : "rgb(119 119 119)",
            color: leftSelectData.length < 1 ? "#333" : "#fff",
          }}
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 13L7 7L0.999999 1"
              stroke="#1F1F1F"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {operations && operations[0]}
        </TransferButton>
        <TransferButton
          disabled={rightSelectData.length < 1 ? true : false}
          onClick={() => TargetToSourceTransfer()}
          css={{
            cursor: rightSelectData.length < 1 ? "not-allowed" : "pointer",
            backgroundColor:
              rightSelectData.length < 1 ? "#EDEDED" : "rgb(119 119 119)",
            color: rightSelectData.length < 1 ? "#333" : "#fff",
          }}
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1L0.999999 7L7 13"
              stroke="#1F1F1F"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {operations && operations[1]}
        </TransferButton>
      </TransferActionButtons>

      <Card
        css={{
          borderColor: borderStatus(),
        }}
      >
        <CardHeader>
          <HeaderAction>
            <Input
              type="checkbox"
              onChange={() => selectDataAll(TransferDirectionsTypes.TARGET)}
              checked={
                targetData.length > 0 &&
                targetData.every(
                  (item: any) =>
                    leftSelectData.findIndex((a: any) => a === item.key) !==
                      -1 ||
                    rightSelectData.findIndex((a: any) => a === item.key) !== -1
                )
              }
            />
            <div>
              {rightSelectData.length > 0 && `${rightSelectData.length} /`}
              {targetData.length} items
            </div>
          </HeaderAction>
          <div>{titles[1]}</div>
        </CardHeader>

        <CardBody
          css={{
            width: width ? width : "220px",
            height: height ? height : "240px",
          }}
        >
          {showSearch && (
            <SearchContainer>
              <FormControl>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0178 11.1912L9.51939 8.69333C10.2644 7.76393 10.6697 6.60791 10.668 5.41675C10.668 2.51875 8.31597 0.166748 5.41797 0.166748C2.51997 0.166748 0.167969 2.51875 0.167969 5.41675C0.167969 8.31475 2.51997 10.6667 5.41797 10.6667C6.60914 10.6684 7.76515 10.2632 8.69455 9.51816L11.1924 12.0166L12.0178 11.1912ZM9.50195 5.41679C9.50362 6.47871 9.09019 7.49922 8.34987 8.26054L8.26237 8.34804C7.50105 9.08835 6.48054 9.50179 5.41862 9.50012C3.16229 9.50012 1.33529 7.67254 1.33529 5.41679C1.33529 3.16046 3.16229 1.33346 5.41862 1.33346C7.67437 1.33346 9.50195 3.16046 9.50195 5.41679Z"
                    fill="#313131"
                  />
                </svg>
                <SearchInput
                  placeholder="Search here"
                  onChange={(e: any) => searchHandleTargetChange(e)}
                />
              </FormControl>
            </SearchContainer>
          )}

          {targetData.length > 0 ? (
            targetData.map((item: any) => (
              <ListContent
                key={item.key}
                id={item.key}
                css={{
                  overflow: targetData ? "auto" : "hidden",
                }}
              >
                <Input
                  id={item.key}
                  onChange={(e: any) => selectRightItemHandle(e)}
                  type="checkbox"
                  value={item.key}
                  checked={
                    !!rightSelectData.find((a: any) => a === item.key)
                      ? true
                      : false
                  }
                />
                <div>{item.title}</div>
              </ListContent>
            ))
          ) : (
            <EmptyData>No Data</EmptyData>
          )}
        </CardBody>
      </Card>
    </Container>
  );
};

export default Transfer;
