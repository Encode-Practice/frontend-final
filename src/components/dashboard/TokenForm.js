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
  
  const TokenForm = () => {
    const [message, setMessage] = React.useState("");
    const [tokenUri, setTokenUri] = React.useState("");
    const [tokenId, setTokenId] = React.useState("");
    const [tokenId2, setTokenId2] = React.useState("");
    const [btnState, setBtnState] = React.useState(false);

    const required = (e) => {
       if(!e.target.value) return
    }

    React.useEffect( async () => {
      let addr = await BlockchainService.ownerAddress();
      setTokenUri(addr)
    }, [tokenUri])

    return (
         
     <Row>
      
          <i style={{color: 'blue'}} className="bi bi-bell me-2"> {message}</i>
          
      
        
        <Col>
         
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              Dynamic NFT 
            </CardTitle>
            <CardBody>
              <Form>
              
                <FormGroup>
                  <Label >Mint NFT</Label>
                  <Input
                    name="mint"
                     value={tokenUri}
                    disabled={true}
                    placeholder=""
                    type="text"
                  />
                </FormGroup>
                {/* <FormGroup>
                  <Label >Address</Label>
                  <Input
                    name="mint"
                    placeholder="Token URI"
                    type="text"
                  />
                </FormGroup> */}
                {/* <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    id="examplePassword"
                    name="password"
                    placeholder="password placeholder"
                    type="password"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Select</Label>
                  <Input id="exampleSelect" name="select" type="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelectMulti">Select Multiple</Label>
                  <Input id="exampleSelectMulti" multiple name="selectMulti" type="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Text Area</Label>
                  <Input id="exampleText" name="text" type="textarea" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">File</Label>
                  <Input id="exampleFile" name="file" type="file" />
                  <FormText>
                    This is some placeholder block-level help text for the above input. Its a bit
                    lighter and easily wraps to a new line.
                  </FormText>
                </FormGroup>
                <FormGroup tag="fieldset">
                  <legend>Radio Buttons</legend>
                  <FormGroup check>
                    <Input name="radio1" type="radio" />{' '}
                    <Label check>Option one is this and that—be sure to include why its great</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input name="radio1" type="radio" />{' '}
                    <Label check>
                      Option two can be something else and selecting it will deselect option one
                    </Label>
                  </FormGroup>
                  <FormGroup check disabled>
                    <Input disabled name="radio1" type="radio" />{' '}
                    <Label check>Option three is disabled</Label>
                  </FormGroup>
                </FormGroup>
               
                <FormGroup check>
                  <Input type="checkbox" /> <Label check>Check me out</Label>
                </FormGroup>
                 */}
                <Button color="danger"  onClick={(e) => {
                  e.preventDefault();
                  let msg = BlockchainService.safeMint(tokenUri);
                  if(msg) {
                   return setMessage('You have minted some team G NFT tokens. Refresh page to see token balance')
                  }
                  
                }}>Safe Mint</Button>
              </Form>
            </CardBody>
          </Card> 
        </Col>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
               Start Cycle 
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                <Label >Token Id (should be less than three)</Label>
                  <Input
                    name="growFlower"
                    value={tokenId}
                    
                    onChange={(e) => {
                      setMessage('');
                      required(e)
                      return setTokenId(e.target.value);
                    }}
                    placeholder="Token Id"
                    type="text"
                  />
                </FormGroup>
                <Button color="primary"  className='primary' onClick={(e) => {
                  
                   e.preventDefault();
                   setBtnState(true);
                  setMessage('Loading...');
                  let msg = BlockchainService.changeStageOne(tokenId);
                  if(msg) {
                    setBtnState(false);
                   return setMessage('You have started a change cycle.')
                  }
                  
                }}>Change stage one</Button>
              </Form>
            </CardBody>
          </Card> 
        </Col>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Stage Level
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                <Label> Token Id</Label>
                        
                  <Input
                    value={tokenId2}
                    onChange={(e) => {
                    setMessage('');
                    required(e)
                    return setTokenId2(e.target.value);
                  }}
                    name="Stage"
                    placeholder="Nft Token Id"
                    type="text"
                  />
                </FormGroup>
                <Button color="secondary" className='btn-primary' onClick={ async (e) => {
                    e.preventDefault();
                    setBtnState(true);
                    setMessage('');
                    let msg = await BlockchainService.getStage(tokenId2);
                    console.log(msg)
                    if(msg) {
                    setBtnState(false);
                    return setMessage(`The NFT is at stage ${msg}`)
                  }
                 }} > Get stage</Button>
              </Form>
            </CardBody>
          </Card> 
        </Col>
      </Row>
  
    );
  };
  
  export default TokenForm;
  