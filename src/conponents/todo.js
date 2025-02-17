import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Table,Form } from 'react-bootstrap';

export default function ToDo() {
    const [users, setUsers] = useState([]);
    const [todos, setTodos] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [completedFilter, setCompletedFilter] = useState('all');
    const [sortAscending, setSortAscending] = useState(true);

    useEffect(() => {
        fetch('http://localhost:9999/user')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(err => console.error('Error fetching users:', err));
    }, []);

    useEffect(() => {
        fetch('http://localhost:9999/todo')
            .then(res => res.json())
            .then(data => {
                let filtered = data;
                if (selectedUsers.length > 0) {
                    filtered = filtered.filter(p => selectedUsers.includes(String(p.userId)));
                }

                // if(status.length > 0){
                //     filtered = filtered.filter(p => p.completed === Boolean(status));

                // }
                 setTodos(filtered);
            })
            .catch(err => console.error('Error fetching todos:', err));
    }, [selectedUsers]);
           

    const sortTodos = () => {
        const sortedTodos = [...todos].sort((a, b) => {
            if (a.title < b.title) return sortAscending ? -1 : 1;
            if (a.title > b.title) return sortAscending ? 1 : -1;
            return 0;
        });
        setTodos(sortedTodos);
        setSortAscending(!sortAscending);
    };

    // const toggleStatus = (id) => {
    //     const updatedToDo = todo.map(t =>
    //         t.id === id ? { ...t, completed: !t.completed } : t
    //     );
    //     setToDo(updatedToDo);
    // };

    const handleUserChange = (userId, checked) => {
        if (checked) {
            setSelectedUsers([...selectedUsers, userId]);
        } else {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        }
    };

    const handleCompletedFilterChange = (event) => {
        setCompletedFilter(event.target.value);
    };

    const filteredTodos = todos.filter(todo => {       
        const completedMatch =
            completedFilter === 'all' ||
            (completedFilter === 'finished' && todo.completed) ||
            (completedFilter === 'unfinished' && !todo.completed);          
        return completedMatch;
    });
    const changeStatus = (id) => {
        const todoToUpdate = todos.find(todo => todo.id === id);
        if (!todoToUpdate) {
            console.error('Todo not found.');
            return;
        }
        const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
        fetch('http://localhost:9999/todo/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTodo)
        })
        .then(() => {
            alert('Change success.');
            // Assuming you don't want to reload the entire page, you can update state instead.
            setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
            ));
        })
        .catch(err => console.error('Error changing status:', err));
    };

    return (
        <Container>
            <Row>
                <Col md={9}>
                    <Container fluid>
                        <Row>
                            <Col>
                                <h2 style={{ textAlign: 'center' }}>ToDo List</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Sort:
                                <Button onClick={sortTodos}>
                                    {sortAscending ? 'Ascending by Title' : 'Descending by Title'}
                                </Button>
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Title</th>
                                            <th>User</th>
                                            <th>Completed</th>
                                            <th>Change Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTodos.map(t => (
                                            <tr key={t.id}>
                                                <td>{t.id}</td>
                                                <td>{t.title}</td>
                                                <td> {users.map(u => u.id === String(t.userId) ? u.name : '').join('')}</td>
                                                <td>{t.completed ? <span style={{ color: 'blue' }}>Finished</span> : <span style={{ color: 'red' }}>Unfinished</span>}</td>
                                                <td>
                                                    <Button className="btn btn-success" onClick={() =>  changeStatus(t.id)}>
                                                        Change
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col md={3}>
                    <Container fluid>
                        <Row>
                            <Col><h3>Users</h3></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form>
                                    {users.map(u => (
                                        <Form.Check
                                            key={u.id}
                                            type="checkbox"
                                            id={`users-${u.id}`}
                                            label={u.name}
                                            onChange={e => handleUserChange(u.id, e.target.checked)}
                                        />
                                    ))}
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col><h3>Completed</h3></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Check
                                        type="radio"
                                        label="Finished"
                                        value="finished"
                                        checked={completedFilter === 'finished'}
                                        onChange={handleCompletedFilterChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Unfinished"
                                        value="unfinished"
                                        checked={completedFilter === 'unfinished'}
                                        onChange={handleCompletedFilterChange}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="All"
                                        value="all"
                                        checked={completedFilter === 'all'}
                                        onChange={handleCompletedFilterChange}
                                    />
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}