import React, { useRef, useEffect, useState } from "react";
import {
  PageHeader,
  Button,
  Row,
  Col,
  Card,
  Avatar,
  Modal,
  Form,
  Drawer,
  DatePicker,
  Input,
  Select,
  message,
  InputNumber,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  itemsFetchAction,
  transectionsFetchAction,
} from "./../../../redux/actions/sheetAction";
const BalanceSheet = ({ history }) => {
  const dispatch = useDispatch();

  //
  //
  //        @ BALANCE SHEET TRANSECTIONS
  //
  //

  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [assetAmt, setAssetAmt] = useState(0);
  const [libAmt, setLibAmt] = useState(0);

  // Transections
  useEffect(() => {
    dispatch(itemsFetchAction());
    dispatch(transectionsFetchAction());
  }, [dispatch]);

  const { transections } = useSelector((state) => state.sheetTransections);
  const { items } = useSelector((state) => state.sheetItems);
  // Items

  const processData = (items, transections) => {
    // Lets Separate asset and liabilities first
    const assetItems = items.filter((x) => x.isAsset);
    const libItems = items.filter((x) => !x.isAsset);
    // Asset Buildup
    var totalAssetAmount = 0;
    for (let assetItem of assetItems) {
      var totalAmount = 0;
      for (let transection of transections) {
        if (transection.a === assetItem.id) {
          totalAmount += transection.aAmt;
          totalAssetAmount += transection.aAmt;
        }
      }
      assetItem.totalAmount = totalAmount;
    }

    // Liabilities + Equity Buildup
    var totalLibAmount = 0;
    for (let libItem of libItems) {
      var totalAmount = 0;
      for (let transection of transections) {
        if (transection.l === libItem.id) {
          totalAmount += transection.lAmt;
          totalLibAmount += transection.lAmt;
        }
      }
      libItem.totalAmount = totalAmount;
    }
    setAssets(assetItems);
    setLiabilities(libItems);
    setAssetAmt(totalLibAmount);
    setLibAmt(totalAssetAmount);
  };

  useEffect(() => {
    processData(items, transections);
  }, [transections, items]);

  return (
    <>
      <Row className="mb-10" gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <PageHeader
            ghost={false}
            onBack={() => history.goBack()}
            title="Balance Sheet"
          />
        </Col>
      </Row>

      {/* // */}
      <Card>
        <Row>
          <Col className="center" md={24} sm={24} xs={24} lg={24}>
            <Typography.Text className="__block font-25">
              Logo BB Samity
            </Typography.Text>
            <Typography.Text className="__block pt-5 ">
              01881818181 | 53 Mirpur 6, Mirpur 1216 , Dhaka
            </Typography.Text>
            <Typography.Text className="__block pt-5 ">
              Balance sheet ( 10/10/2021 )
            </Typography.Text>
          </Col>
        </Row>
      </Card>

      <div
        style={{
          padding: "",
          background: "#ffffff",
        }}
      >
        <Row>
          <Col style={{ padding: "20px" }} sm={24} xs={24} md={12} lg={12}>
            <div className="balanceSheetHead">
              <Typography.Text className="font-20">Assets</Typography.Text>
              <Typography.Text className="font-20">
                {assetAmt} /=
              </Typography.Text>
            </div>
            <ul className="balanceSheetItems">
              {assets &&
                assets.map((asset) => (
                  <li key={asset._id}>
                    <Typography.Text>{asset.itemName}</Typography.Text>
                    <Typography.Text>{asset.totalAmount} /=</Typography.Text>
                  </li>
                ))}

              <li>
                <Typography.Text></Typography.Text>
                <Typography.Text>{assetAmt} /=</Typography.Text>
              </li>
            </ul>
          </Col>
          <Col
            style={{ borderLeft: "1px solid #e4e4e4", padding: "20px" }}
            sm={24}
            xs={24}
            md={12}
            lg={12}
          >
            <div className="balanceSheetHead">
              <Typography.Text className="font-20">
                Liabilities + Equity
              </Typography.Text>
              <Typography.Text className="font-20">{libAmt} /=</Typography.Text>
            </div>
            <ul className="balanceSheetItems">
              {liabilities &&
                liabilities.map((lib) => (
                  <li key={lib._id}>
                    <Typography.Text>{lib.itemName}</Typography.Text>
                    <Typography.Text>{lib.totalAmount} /=</Typography.Text>
                  </li>
                ))}

              <li>
                <Typography.Text></Typography.Text>
                <Typography.Text>{libAmt} /=</Typography.Text>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BalanceSheet;
