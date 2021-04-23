import React from "react";
import { Card, Col, Row, Typography } from "antd";
import Chart from "./../../components/utils/Chart";
const Dashboard = () => {
  // </div>
  return (
    <Row gutter={[8, 8]}>
      <Col xs={24} sm={24} md={12} xl={12}>
        <Card title="Job overview">
          <Chart />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} xl={12}>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={24} xl={24}>
            <Card style={styles.stateCard}>
              <Typography style={{ fontSize: 35 }}>$220</Typography>
              <Typography>Today's Commission Earned</Typography>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} xl={24}>
            <Card style={styles.stateCard}>
              <Typography style={{ fontSize: 35 }}>20</Typography>
              <Typography>Today's toal Job</Typography>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Dashboard;

const styles = {
  stateCard: {
    minHeight: "250px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
};
