import React from 'react';
import { 
    translate,
    Datagrid,
    Edit,
    Create,
    EditButton,
    Filter,
    List,
    NullableBooleanInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
    Toolbar,
    ToolbarGroup,
    FlatButton,
    FunctionField,
    ChevronLeft,ChevronRight
} from 'admin-on-rest';

import {Summary} from './summary';

class SyslogList extends React.Component {

    render() {
        const SyslogFilter = (props) => (
            <Filter {...props}>
             <TextInput label="pos.search" source="q" alwaysOn />
                    
            </Filter>
        );

        const {myOwnProp, ...props} = this.props;
            
        const PostPagination = ({ page, perPage, total, setPage }) => {
            const nbPages = Math.ceil(total / perPage) || 1;
            return (
                nbPages > 1 &&
                    <Toolbar>
                        <ToolbarGroup>
                        {page > 1 &&
                            <FlatButton primary key="prev" label="Prev" icon={<ChevronLeft />} onClick={() => setPage(page - 1)} />
                        }
                        {page !== nbPages &&
                            <FlatButton primary key="next" label="Next" icon={<ChevronRight />} onClick={() => setPage(page + 1)} labelPosition="before" />
                        }
                        </ToolbarGroup>
                    </Toolbar>
            );
        }

        return (
            <div>
            <Summary />
            <List {...props} filters={<SyslogFilter />} sort={{ field: 'source', order: 'DESC' }} >
            <Datagrid options={{ fixedHeader: true, height: 400 }}>
                
                <TextField source="source" title="User ID"/>
                <FunctionField  render={record => {return  new Date(Number(`${record.timestamp}`*1000)).toLocaleString()}} label="Recieved Time" sortable={false}/>
                <TextField source="description" />
                <TextField source="event_type" />
                
                <EditButton />
            </Datagrid>
        </List>
        </div>
            );
    }
}

export {SyslogList};