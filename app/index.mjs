/** 
 * Initial Script of this App
*/

/** App Controller */
class Tasker {
	taskTemplate = document.querySelector('template#task')
	taskList = document.querySelector('task-list')
	taskCreator = {
		createBtn: document.querySelector('task-creator create-btn'),
		inputHeader: document.querySelector('task-creator input.header'),
		inputDesc: document.querySelector('task-creator input.desc'),
	}

	/* Install task buttons hooks */
	install() {
		const addTaskHandler = () => {
			const { header, desc } = this.getTaskCreatorFields()
			if (header && desc) {
				this.add(header, desc)
				this.clearTaskCreator()
			}
		}

		// Handle events of clicking add button or [Enter] on fields
		this.taskCreator.createBtn.addEventListener('click', addTaskHandler)
		this.taskCreator.inputHeader.addEventListener('keydown', e => {
			if (e.keyCode === 13) addTaskHandler()
		})
		this.taskCreator.inputDesc.addEventListener('keydown', e => {
			if (e.keyCode === 13) addTaskHandler()
		})
		return this
	}

	/* Clear task creator fields */
	clearTaskCreator() {
		this.taskCreator.inputHeader.value = ''
		this.taskCreator.inputDesc.value = ''
	}

	/* Get task creator texts */
	getTaskCreatorFields() {
		return {
			header: this.taskCreator.inputHeader.value,
			desc: this.taskCreator.inputDesc.value,
		}
	}

	/* Add new task */
	add(header, desc) {
		// Make a clone of template node
		const task = this.taskTemplate.content.cloneNode(true)
		// Configure new task element
		task.querySelector('header').innerText = header
		task.querySelector('desc').innerText = desc
		// Append task to list
		this.taskList.appendChild(task)		

		// Get DOM element
		const domTask = this.taskList.querySelector('task:last-child')

		// Install self-removing handler		
		domTask.querySelector('delete-btn').addEventListener('click', () => {
			this.remove(domTask)
		})

		// Apply task fade-in animation	
		const taskHeight = domTask.clientHeight
		domTask.animate([
			{
				filter: 'opacity(0)',
				height: '0',
			},
			{
				filter: 'opacity(0)',
				height: `${taskHeight}px`,
			},
			{
				filter: 'opacity(1)',
				height: 'auto',
			},
		], {
			duration: 300,
			easing: 'ease-out',
		})
	}

	/* Remove task by index */
	remove(domTask) {
		const taskHeight = domTask.clientHeight
		domTask.animate([
			{
				filter: 'opacity(1)',
				height: 'auto',
			},
			{
				filter: 'opacity(0)',
				height: `${taskHeight}px`,
				padding: '0',
			},
			{
				filter: 'opacity(0)',
				height: '0',
				padding: '0',
			},
		], {
			duration: 300,
			easing: 'ease-in',
			fill: 'both',
		})
		setTimeout(() => this.taskList.removeChild(domTask), 300)
	}
}

// Launching the app
const tasker = new Tasker().install()
// To global scope
window.tasker = tasker