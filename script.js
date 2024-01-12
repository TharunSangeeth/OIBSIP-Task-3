window.addEventListener('load', () => {
	to-dos = JSON.parse(localStorage.getItem('to-dos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-to-do-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTo-doForm.addEventListener('submit', e => {
		e.preventDefault();

		const to-do = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		to-dos.push(to-do);

		localStorage.setItem('to-dos', JSON.stringify(to-dos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

function DisplayTo-dos () {
	const to-doList = document.querySelector('#to-do-list');
	to-doList.innerHTML = "";

	to-dos.forEach(to-do => {
		const to-doItem = document.createElement('div');
		to-doItem.classList.add('to-do-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (to-do.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('to-do-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${to-do.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		to-doItem.appendChild(label);
		to-doItem.appendChild(content);
		to-doItem.appendChild(actions);

		to-doList.appendChild(to-doItem);

		if (to-do.done) {
			to-doItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			to-do.done = e.target.checked;
			localStorage.setItem('to-dos', JSON.stringify(to-dos));

			if (to-do.done) {
				-.classList.add('done');
			} else {
				to-doItem.classList.remove('done');
			}

			DisplayTo-dos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				to-do.content = e.target.value;
				localStorage.setItem('to-dos', JSON.stringify(to-dos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			to-dos = to-dos.filter(t => t != to-do);
			localStorage.setItem('todos', JSON.stringify(to-dos));
			DisplayTo-dos()
		})

	})
}