import { LightningElement, wire, track,api } from 'lwc';
import getTasks from '@salesforce/apex/TaskController.getTasks';
import updateTaskWhatId from '@salesforce/apex/TaskController.updateTaskWhatId';
import updateTaskStatus from '@salesforce/apex/TaskController.updateTaskStatus';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class TaskList extends NavigationMixin(LightningElement) {

    @api recordId;

    @track tasks;
    @track completedTasks = [];
    @track error;

    @wire(getTasks)
    wiredTasks({ error, data }) {
        if (data) {
            this.tasks = data.map(task => ({
                ...task,
                ActivityDate: new Date(task.ActivityDate).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
                expanded: false,
                completed: false

            }));
            
            this.error = undefined;
           // this.checkAndUpdateTaskWhatId();
            
        } else if (error) {
            this.error = error;
            this.tasks = undefined;
        }
    }

    // checkAndUpdateTaskWhatId() {
    //     const taskIds = this.tasks.filter(task => task.WhatId !== this.recordId).map(task => task.Id);
    //     if (taskIds.length > 0) {
    //         updateTaskWhatId({ taskIds : this.taskIds, whatId: this.recordId })
    //             .then(updatedTasks => {
    //                 alert(`Case Rec Id connected Method ${this.recordId}`);
    //                 this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Success',
    //                     message: 'Task what id updated successfully',
    //                     variant: 'success'
    //                 })
    //             );
                   
    //                 alert(this.updatedTasks);
    //                 this.tasks = updatedTasks;
    //                 alert(this.tasks);
    //                 return refreshApex(this.tasks);
    //             })
    //             .catch(error => {
    //                 this.showToast('Error', error, 'error');
    //             });
    //     }
    // }
 
    


    connectedCallback() {
        //console.log(this.recordId);
        alert(`Case Rec Id ${this.recordId}`);
        window.addEventListener('scroll', this.handleScroll);
        
    }

    

    handleScroll = () => {
        const menus = this.template.querySelectorAll('lightning-button-menu');
        menus.forEach(menu => {
            if (menu.state === 'opened') {
                menu.close();
            }
        });
    }

    navigateToRecord(event) {
        event.preventDefault();
        const recordId = event.currentTarget.dataset.recordId;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: 'Task',
                actionName: 'view'
            }
        });
    }

    handleMenuSelect(event) {
        const action = event.detail.value;
        const recordId = event.target.closest('li').dataset.recordId;
        switch (action) {
            case 'edit':
                this.editTask(recordId);
                break;
            case 'changeStatus':
                this.changeStatus(recordId);
                break;
            case 'createFollowUp':
                this.createFollowUpTask(recordId);
                break;
        }
    }

    editTask(recordId) {
        console.log(`Edit task ${recordId}`);
        // Implement edit task logic here
    }

    changeStatus(recordId) {
        console.log(`Change status for task ${recordId}`);
        // Implement change status logic here
    }

    createFollowUpTask(recordId) {
        console.log(`Create follow-up task for ${recordId}`);
        // Implement create follow-up task logic here
    }

    handleCheckboxChange(event) {
        const isChecked = event.target.checked;
        const recordId = event.target.dataset.recordId;
        console.log(`Checkbox for task ${recordId} is now ${isChecked ? 'checked' : 'unchecked'}`);

        // Update task status and move to completed tasks list
        if (isChecked) {
            this.updateTaskStatusBatch([recordId], 'Completed');
        } else {
            const taskToUncomplete = this.completedTasks.find(task => task.Id === recordId);
            taskToUncomplete.completed = false;
            this.tasks = [...this.tasks, taskToUncomplete];
            this.completedTasks = this.completedTasks.filter(task => task.Id !== recordId);
        }
    }
   
    updateTaskStatusBatch(taskIds, status) {
        updateTaskStatus({ taskIds, status })
            .then(() => {
                console.log(`Successfully updated status for tasks to ${status}`);
                this.tasks = this.tasks.map(task => {
                    if (taskIds.includes(task.Id)) {
                        task.completed = status === 'Completed';
                    }
                    return task;
                });

                const completedTasks = this.tasks.filter(task => task.completed);
                this.completedTasks = [...this.completedTasks, ...completedTasks];
                this.tasks = this.tasks.filter(task => !task.completed);

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Task status updated successfully',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                console.error(`Error updating status for tasks: `, error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Error marking task as completed',
                        variant: 'error'
                    })
                );
            });
    }

    toggleDescription(event) {
        const recordId = event.currentTarget.dataset.recordId;
        this.tasks = this.tasks.map(task => {
            if (task.Id === recordId) {
                task.expanded = !task.expanded;
            }
            return task;
        });

        this.completedTasks = this.completedTasks.map(task => {
            if (task.Id === recordId) {
                task.expanded = !task.expanded;
            }
            return task;
        });
    }
}