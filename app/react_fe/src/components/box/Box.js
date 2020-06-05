import React from 'react';

import { Card, CardHeader, CardBody } from 'reactstrap';


const box = (props) => {
  switch (props.type) {
    case ( 'no-header' ):
      return (<section style={{"paddingTop": "10px" }}>
                <Card style={{"borderColor" : "black"}}>
                  <CardBody><h5>{props.title}</h5>{props.children}</CardBody>
                </Card>
              </section>);
    default: return (<section style={{"paddingTop": "10px" }}>
              <Card style={{"borderColor" : "black"}}>
                <CardHeader style={{"borderColor" : "black", "color":"black", "fontWeight" : "bold"}}>{props.header}</CardHeader>
                <CardBody>{props.children}</CardBody>
              </Card>
            </section>);
  }
}

export default box;
