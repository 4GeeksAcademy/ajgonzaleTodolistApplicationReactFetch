import { func } from "prop-types";
import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {

	const [list, setList] = useState([]);
	const [item, setItem] = useState('');

	function getList() {
		fetch('https://playground.4geeks.com/todo/users/ajgonzale')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data.detail == "User ajgonzale doesn't exist.") {
					requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' }
					};
					fetch('https://playground.4geeks.com/todo/users/ajgonzale', requestOptions).then(
						response => {
							setItem('');
							setList([]);
						});
				} else {						
					setList(data.todos);
				}
			});
	}

	useEffect(() => {
		getList()
	}, []);

	let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"label": "","is_done": false})
    };   

	function addItem() {
		
		requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({"label": item,"is_done": false})
		};

		fetch('https://playground.4geeks.com/todo/todos/ajgonzale', requestOptions)
			.then(response => response.json())
			.then(data => {
				setList([...list, data]);
			});
		setItem('');		
	}

	function removeItem(id) {

		requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
		};
		
		fetch('https://playground.4geeks.com/todo/todos/'+id, requestOptions)
			.then(response => {
				getList();
			});
	}

	function removeAllItem() {
		requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		};

		fetch('https://playground.4geeks.com/todo/users/ajgonzale', requestOptions)
			.then(response => {
				requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' }
				};
				fetch('https://playground.4geeks.com/todo/users/ajgonzale', requestOptions).then(
					response => {
						setItem('');
						setList([]);
					});
			});
		setItem('');		
	}

	return (
		<div className="text-center container-fluid d-flex justify-content-center">
			<div>
				<h1 className="text-center mt-5 tittle" >todos</h1>
				<div>
					<input type="text" className="w-100 border-bottom input" onChange={e => setItem(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter' && e.target.value.trim() != '') addItem()}} value={item}></input>
				</div>
				<div id='parentItems'>{ 
							list.map != undefined && list.map((item, index) => {
								return <div key={index} className="itemList"><div>{item.label}</div><i className="fas fa-times iconX" onClick={e => removeItem(item.id)}></i></div>
							}) 
						}
						{ list.length == 0 && <div className="itemList">No tasks, add a task</div>}
				</div>
				<div className="deleteButton"><div className='bottomList'>{list.length} item left</div><div><button type="button" className="btn btn-danger" onClick={removeAllItem}>Delete All</button></div></div>
				<p className="p-3">
					Made by{" "}
					<a href="#">Alejandro Gonzalez</a>, with
					love!
				</p>
			</div>
		</div>
	);
};

export default Home;