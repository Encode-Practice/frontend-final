import React from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import TokenForm from '../../src/components/dashboard/tokenForm';
import TokenForm2 from "../../src/components/dashboard/tokenForm2";
import TokenForm3 from "../../src/components/dashboard/tokenForm3";

import BlockchainService from "../../src/services/blockchain.service";

const Tables = () => {
  const [blockData, setBlockData] = React.useState({
    networkName: "...",
    symbol: "...",
    balance: "...",
    address: "...",
    blockNumber: "...",
    contractAddress: "..",

  });
    

    const init =  () => {
            Promise.all([

        
        BlockchainService.networkName(),
        //BlockchainService.name(),
        BlockchainService.symbol(),
        BlockchainService.tokenBalance(),
        BlockchainService.ownerAddress(),
        BlockchainService.blockNumber(),
        
    //    BlockchainService.etherBalance(),
        BlockchainService.contractAddress(),
        

        ])
        .then((values) => {
            console.log(values);
            setBlockData({
              networkName: values[0],
              symbol: values[1],
              balance: values[2],
              address: values[3],
              blockNumber: values[4],
              contractAddress: values[5],
            });
        })
        .catch((error) => {
            console.log(error.response);
        })
    }

    React.useEffect(() => {
       init();
    }, []);

  return (
    <Row >
     
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Wallet Portfolio
          </CardTitle>
          <CardBody className="">
            <Table bordered>
              <thead>
                <tr>
                  <td >Name</td>
                  <td>Descrition</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* <th scope="row">1</th> */}
                  <td>Network name</td>
                  <td>{blockData.networkName}</td>
                </tr>
                <tr>
                  {/* <th scope="row">2</th> */}
                  <td>Token symbol</td>
                  <td>{blockData.symbol}</td>
                </tr>
                <tr>   
                  <td>Token balance</td>
                  <td>{blockData.balance}</td> 
                </tr>
                <tr>
                  {/* <th scope="row">2</th> */}
                  <td>Signer Address</td>
                  <td>{blockData.address}</td>
                </tr>
                <tr>
                  {/* <th scope="row">2</th> */}
                  <td>Block number</td>
                  <td>{blockData.blockNumber}</td>
                </tr>
                <tr>
                  {/* <th scope="row">2</th> */}
                  <td>Contract address</td>
                  <td>{blockData.contractAddress}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
      <Col lg="12">
        <TokenForm />
      </Col>
      <Col lg="12">
        <TokenForm2 />
      </Col>
      <Col lg="12">
        <TokenForm3 />
      </Col>
    </Row>
  );
};

export default Tables;
