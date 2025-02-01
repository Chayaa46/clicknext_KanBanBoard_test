<template>
  <div class="kanban-wrapper">
    <h1>Kanban Board</h1>

    <div class="kanban-container">
      <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="kanban-column" @mousedown="onColumnMouseDown(columnIndex)">
        <div class="column-header">
          <input v-if="column.isEditing" v-model="column.title" @blur="saveColumnTitle(columnIndex)" />
          <span v-else @dblclick="editColumnTitle(columnIndex)">{{ column.title }}</span>
          <button class="delete-column-btn" @click="deleteColumn(columnIndex)">🗑️</button>
        </div>

        <!-- Member List in Column -->
        <div class="column-members">
          <h4>Members:</h4>
          <span v-for="(member, memberIndex) in column.members" :key="memberIndex" class="member-badge">
            {{ member }}
            <button class="remove-member-btn" @click="removeMember(columnIndex, memberIndex)">❌</button>
          </span>
        </div>

        <!-- Invite Member Button -->
        <button class="invite-btn" @click="inviteMember(columnIndex)">+ Invite Member</button>

        <!-- Tasks in Column -->
        <div class="kanban-tasks" @dragover.prevent @drop="onDrop(columnIndex)">
          <div v-for="(task, taskIndex) in column.tasks" :key="taskIndex" class="kanban-task" :draggable="true" @dragstart="onDragStart(taskIndex, columnIndex)" @dragend="onDragEnd">
            <input v-if="task.isEditing" v-model="task.title" @blur="saveTaskTitle(columnIndex, taskIndex)" />
            <span v-else @dblclick="editTaskTitle(columnIndex, taskIndex)">{{ task.title }}</span>
            <div class="task-tags">
              <span v-for="(tag, tagIndex) in task.tags" :key="tagIndex" class="task-tag">{{ tag }}</span>
            </div>
            <button class="delete-task-btn" @click="deleteTask(columnIndex, taskIndex)">🗑️</button>
            <button class="add-tag-btn" @click="addTagToTask(columnIndex, taskIndex)">+ Tag</button>
          </div>
        </div>

        <button class="add-task-btn" @click="addTask(columnIndex)">+ Add Task</button>
      </div>
    </div>

    <button class="add-column-btn" @click="addColumn">+ Add Column</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      availableMembers: ["Gung", "Potae", "Zinvabe"],
      columns: [
        { title: "To Do", tasks: [{ title: "Task 1", tags: [] }, { title: "Task 2", tags: [] }], members: [], isEditing: false },
        { title: "In Progress", tasks: [{ title: "Task 3", tags: [] }], members: [], isEditing: false },
        { title: "Done", tasks: [{ title: "Task 4", tags: [] }], members: [], isEditing: false }
      ],
      draggedTask: null,
      draggedColumn: null
    };
  },
  methods: {
    // Add Column
    addColumn() {
      const columnTitle = prompt("Enter column name:");
      if (columnTitle) {
        this.columns.push({ title: columnTitle, tasks: [], members: [], isEditing: false });
      }
    },
    // Delete Column
    deleteColumn(columnIndex) {
      if (confirm(`Are you sure you want to delete this column?`)) {
        this.columns.splice(columnIndex, 1);
      }
    },
    // Edit Column Title
    editColumnTitle(columnIndex) {
      this.columns[columnIndex].isEditing = true;
    },
    saveColumnTitle(columnIndex) {
      this.columns[columnIndex].isEditing = false;
    },
    
    // Add Task
    addTask(columnIndex) {
      const taskTitle = prompt("Enter task title:");
      if (taskTitle) {
        this.columns[columnIndex].tasks.push({ title: taskTitle, tags: [] });
      }
    },
    // Delete Task
    deleteTask(columnIndex, taskIndex) {
      if (confirm(`Are you sure you want to delete this task?`)) {
        this.columns[columnIndex].tasks.splice(taskIndex, 1);
      }
    },
    // Edit Task Title
    editTaskTitle(columnIndex, taskIndex) {
      this.columns[columnIndex].tasks[taskIndex].isEditing = true;
    },
    saveTaskTitle(columnIndex, taskIndex) {
      this.columns[columnIndex].tasks[taskIndex].isEditing = false;
    },
    // Add Tag to Task
    addTagToTask(columnIndex, taskIndex) {
      const tag = prompt("Enter tag:");
      if (tag) {
        this.columns[columnIndex].tasks[taskIndex].tags.push(tag);
      }
    },

    // Invite Member
    inviteMember(columnIndex) {
      const memberName = prompt(`Available members: ${this.availableMembers.join(", ")}\nEnter member's name:`);
      if (memberName && this.availableMembers.includes(memberName)) {
        if (!this.columns[columnIndex].members.includes(memberName)) {
          this.columns[columnIndex].members.push(memberName);
        } else {
          alert("This member is already in this column!");
        }
      } else {
        alert("Invalid member name!");
      }
    },
    // Remove Member
    removeMember(columnIndex, memberIndex) {
      const memberName = this.columns[columnIndex].members[memberIndex];
      const confirmDelete = confirm(`Are you sure you want to remove ${memberName} from this column?`);
      if (confirmDelete) {
        this.columns[columnIndex].members.splice(memberIndex, 1);
      }
    },

    // Drag and Drop
    onDragStart(taskIndex, columnIndex) {
      this.draggedTask = { taskIndex, columnIndex };
    },
    onDragEnd() {
      this.draggedTask = null;
    },
    onDrop(columnIndex) {
      if (this.draggedTask) {
        const { taskIndex, columnIndex: fromColumnIndex } = this.draggedTask;
        const task = this.columns[fromColumnIndex].tasks[taskIndex];
        this.columns[columnIndex].tasks.push(task);
        this.columns[fromColumnIndex].tasks.splice(taskIndex, 1);
        this.draggedTask = null;
      }
    },

    onColumnMouseDown(columnIndex) {
      this.draggedColumn = columnIndex;
    }
  }
};
</script>

<style scoped>
.kanban-wrapper {
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

/* Kanban Columns */
.kanban-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
}

.kanban-column {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 280px;
  text-align: center;
  transition: transform 0.2s;
}

.kanban-column:hover {
  transform: scale(1.05);
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-header input {
  width: 100%;
  border: none;
  background: #f1f1f1;
  padding: 5px;
  font-size: 1rem;
}

.delete-column-btn {
  background: red;
  color: white;
  border: none;
  cursor: pointer;
}

.delete-column-btn:hover {
  background: darkred;
}

.column-members {
  background: #f1f1f1;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.member-badge {
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: bold;
  display: inline-block;
  margin: 3px;
}

.remove-member-btn {
  background: red;
  color: white;
  border: none;
  padding: 2px 6px;
  border-radius: 12px;
  margin-left: 5px;
  cursor: pointer;
}

.invite-btn {
  padding: 8px 12px;
  border: none;
  background: #28a745;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.kanban-tasks {
  min-height: 150px;
  padding: 10px;
  border-radius: 6px;
  background: #f9f9f9;
}

.kanban-task {
  background: #fff;
  padding: 10px;
  margin: 5px 0;
  border-radius: 6px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.kanban-task:hover {
  transform: scale(1.02);
}

.task-tags {
  margin-top: 5px;
}

.task-tag {
  background: #007bff;
  color: white;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.8rem;
  margin: 2px;
}

.add-task-btn {
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 6px;
}

.add-column-btn {
  margin-top: 20px;
  padding: 8px 12px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 6px;
  font-size: 1rem;
}
</style>
