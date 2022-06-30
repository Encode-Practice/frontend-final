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
  
  const TokenForm3 = () => {
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
                Random number generation
            </CardTitle>
            <CardBody>
              <Form>
              
                <FormGroup>
                  <Label >Random number</Label>
                  <Input
                    name="random number"
                    disabled
                   
                    value={"randomness"}
                    placeholder="in seconds"
                    type="text"
                  />
                </FormGroup>
                
                 
                <Button color="secondary"  onClick={ async (e) => {
                  e.preventDefault();
                  let msg = await BlockchainService.randomNumber();
                  setMessage('Loading...')
                  if(msg) {
                   return setMessage(`The random number is ${msg}`)

                  }
                  
                }}>Random number</Button>
              </Form>
            </CardBody>
          </Card> 
        </Col>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Start change cycle with random number  
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                <Label >Change stage randomly</Label>
                  <Input
                    name="interval random"
                     onChange={(e) => {
                        setMessage('');
                        required(e)
                        return setTokenId(e.target.value);
                      }}
                    value={tokenId}
                    placeholder="token Id"
                    type="text"
                  />
                </FormGroup>
                <Button color="primary"  className='primary' onClick={ async (e) => {
                  
                   e.preventDefault();
                   setBtnState(true);
                   setMessage('Loading...');
                  let msg = await BlockchainService.changeStageRandom(tokenId);
                  if(msg) {
                    setBtnState(false);
                   return setMessage(`The random change cycle has started`)
                  }
                  
                }}>Change stage random</Button>
              </Form>
            </CardBody>
          </Card> 
        </Col>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Change stage using ethereum price feed 
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                <Label> </Label>
                        
                  <Input
                    value={tokenId2}
                    onChange={(e) => {
                    setMessage('');
                    required(e)
                    return setTokenId2(e.target.value);
                  }}
                    name="uri"
                    placeholder="Token id"
                    type="text"
                  />
                </FormGroup>
                <Button color="primary" className='btn-primary' onClick={ async (e) => {
                    e.preventDefault();
                    setBtnState(true);
                    setMessage('Loading...');
                    let msg = await BlockchainService.changeStagePricefeed(tokenId2);
                    console.log(msg)
                    if(msg && msg.length > 0) {
                    setBtnState(false);
                    return setMessage(`The data retuned is  ${msg[0]}, ${msg[1]} and ${msg[2]}`)
                  }
                 }} > Change with price feed</Button>
              </Form>
            </CardBody>
          </Card> 
        </Col>
      </Row>
  
    );
  };
  
  export default TokenForm3;
  