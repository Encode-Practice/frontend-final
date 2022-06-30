import React from 'react';
import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
  } from 'reactstrap';
  import BlockchainService from "../../services/blockchain.service";
  
  const TokenForm2 = () => {
    const [message, setMessage] = React.useState("");
    const [tokenUri, setTokenUri] = React.useState("");
    const [tokenId, setTokenId] = React.useState("");
    const [tokenId2, setTokenId2] = React.useState("");
    const [btnState, setBtnState] = React.useState(false);

    const required = (e) => {
       if(!e.target.value) return
    }

  
    return (
         
     <Row>
      
          <i style={{color: 'blue'}} className="bi bi-bell me-2"> {message}</i>
          
      
        
        <Col>
         
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              Change Interval  
            </CardTitle>
            <CardBody>
              <Form>
              
                <FormGroup>
                  <Label >Change Interval</Label>
                  <Input
                    name="change interval"
                    onChange={(e) => {
                        setMessage('');
                        required(e)
                        return setTokenId(e.target.value);
                      }}
                    value={tokenId}
                    placeholder="in seconds"
                    type="text"
                  />
                </FormGroup>
                
                 
                <Button color="dark"  onClick={(e) => {
                  e.preventDefault();
                  setMessage('Loading...');
                  let msg = BlockchainService.changeInterval(tokenId);
                 
                  if(msg) {
                   return setMessage('Interval updated.')
                  }
                  
                }}>Change Interval</Button>
              </Form>
            </CardBody>
          </Card> 
        </Col>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Interval Status 
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                <Label >Interval Status</Label>
                  <Input
                    name="interval"
                    value={tokenId2}
                    disabled
                    placeholder="interval status"
                    type="text"
                  />
                </FormGroup>
                <Button color="primary"  className='primary' onClick={ async (e) => {
                  
                   e.preventDefault();
                   setBtnState(true);
                   setMessage('Loading...');
                  let msg = await BlockchainService.getInterval();
                  if(msg) {
                    setBtnState(false);
                   return setMessage(`The set interval is ${msg}`)
                  }
                  
                }}>Get interval</Button>
              </Form>
            </CardBody>
          </Card> 
        </Col>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Token URI 
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                <Label> Token Uri</Label>
                        
                  <Input
                    value={tokenUri}
                    onChange={(e) => {
                    setMessage('');
                    required(e)
                    return setTokenUri(e.target.value);
                  }}
                    name="uri"
                    placeholder="Token Uri"
                    type="text"
                  />
                </FormGroup>
                <Button color="primary" className='btn-primary' onClick={ async (e) => {
                    e.preventDefault();
                    setBtnState(true);
                    setMessage('Loading...');
                    let msg = await BlockchainService.tokenURI(tokenUri);
                    console.log(msg)
                    if(msg) {
                    setBtnState(false);
                    return setMessage(`The token uri is  ${msg}`)
                  }
                 }} > Get token uri</Button>
              </Form>
            </CardBody>
          </Card> 
        </Col>
      </Row>
  
    );
  };
  
  export default TokenForm2;
  