import React, { Component} from 'react';
import {
    Box,
    Button,
    Heading,
    Grommet,
} from 'grommet';

import './App.css';

const theme = {
    global: {
      colors: {
        brand: '#000000',
        focus: '#000000'
      },
      font: {
        family: 'Lato',
      },
    },
  };

export class DocViewAppt extends Component {
    state = { apptlist: [] }

    componentDidMount() {
        this.getNames();
    }
    getNames() {
        fetch('http://localhost:3001/userInSession') 
            .then(res => res.json())
            .then(res => {
                let string_json = JSON.stringify(res);
                let email_json = JSON.parse(string_json);
                let email_in_use = email_json.email;
                console.log(email_in_use);
                fetch('http://localhost:3001/doctorViewAppt?email=' + email_in_use)
                    .then(res => res.json())
                    .then(res => {
                        this.setState({ apptlist: res.data });
                    });
            });
    }

    render() {
        const { apptlist } = this.state;
        const Header = () => (
            <Box
                tag='header'
                background='brand'
                pad='small'
                elevation='small'
                justify='between'
                direction='row'
                align='center'
                flex={false}
            >
                <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/"><Heading level='3' margin='none'>HMS</Heading></a>
            </Box>
        );

        const Body = () => (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>Symptoms</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apptlist.map(appt =>
                                <tr key={appt.name}>
                                    <td>{appt.a_id}</td>
                                    <td>{appt.p_name}</td>
                                    <td>{new Date(appt.a_date).toLocaleDateString().substring(0,10)} </td>
                                    <td>{appt.starttime}</td>
                                    <td>{appt.symptoms}</td>
                                    <td>{appt.status}</td>
                                    <td>
                                        {appt.status === "NotDone"?
                                            <Button label="Cancel"
                                            onClick = {() => {
                                                fetch('http://localhost:3001/deleteAppt?uid='+ appt.a_id)
                                                window.location.reload();
                                            }}
                                            ></Button>
                                        :<div></div>}
                                    </td> 
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        );
        return (
            <Grommet full={true}
            theme = {theme}>
                <Header />
                <Box fill={true}>
                    <Body />
                </Box>
            </Grommet>
        );
    }
}

export default DocViewAppt;