<template>
  <div class="kanban-wrapper">
    <h1>Kanban Board</h1>

    <div class="kanban-container">
      <!-- Loop through columns -->
      <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="kanban-column">
        
        <!-- Edit Column Title -->
        <h2 @dblclick="editColumnTitle(columnIndex)">
          {{ column.title }}
        </h2>
        
        <!-- Delete Column Button -->
        <button @click="deleteColumn(columnIndex)">Delete Column</button>

        <!-- Tasks -->
        <div
          class="kanban-tasks"
          v-for="(task, taskIndex) in column.tasks"
          :key="taskIndex"
          draggable="true"
          @dragstart="dragStart(taskIndex, columnIndex)"
          @dragover.prevent
          @drop="dropTask(taskIndex, columnIndex)"
        >
          <!-- Task Title (Editable) -->
          <div @dblclick="editTaskTitle(columnIndex, taskIndex)">
            {{ task.title }}
          </div>

          <!-- Delete Task Button -->
          <button @click="deleteTask(columnIndex, taskIndex)">Delete Task</button>

          <!-- Task Tags -->
          <div class="task-tags">
            <span v-for="(tag, tagIndex) in task.tags" :key="tagIndex" class="tag">{{ tag }}</span>
            <button @click="addTag(columnIndex, taskIndex)">+ Add Tag</button>
          </div>
        </div>

        <!-- Add Task Button -->
        <button class="add-task-btn" @click="addTask(columnIndex)">+ Add Task</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dragIndex: null,
      dragColumnIndex: null,
      columns: [
        { title: 'To Do', tasks: [{ title: 'Task 1', tags: [] }, { title: 'Task 2', tags: [] }] },
        { title: 'In Progress', tasks: [{ title: 'Task 3', tags: [] }] },
        { title: 'Done', tasks: [{ title: 'Task 4', tags: [] }] }
      ]
    };
  },
  methods: {
    // Add Task
    addTask(columnIndex) {
      const taskTitle = prompt('Enter task title:');
      if (taskTitle) {
        this.columns[columnIndex].tasks.push({ title: taskTitle, tags: [] });
      }
    },

    // Edit Task Title
    editTaskTitle(columnIndex, taskIndex) {
      const newTitle = prompt('Enter new task title:', this.columns[columnIndex].tasks[taskIndex].title);
      if (newTitle) {
        this.columns[columnIndex].tasks[taskIndex].title = newTitle;
      }
    },

    // Delete Task
    deleteTask(columnIndex, taskIndex) {
      if (confirm('Are you sure you want to delete this task?')) {
        this.columns[columnIndex].tasks.splice(taskIndex, 1);
      }
    },

    // Add Tag to Task
    addTag(columnIndex, taskIndex) {
      const tag = prompt('Enter tag:');
      if (tag) {
        this.columns[columnIndex].tasks[taskIndex].tags.push(tag);
      }
    },

    // Edit Column Title
    editColumnTitle(columnIndex) {
      const newTitle = prompt('Enter new column title:', this.columns[columnIndex].title);
      if (newTitle) {
        this.columns[columnIndex].title = newTitle;
      }
    },

    // Delete Column
    deleteColumn(columnIndex) {
      if (confirm('Are you sure you want to delete this column?')) {
        this.columns.splice(columnIndex, 1);
      }
    },

    // Dragging Start
    dragStart(taskIndex, columnIndex) {
      this.dragIndex = taskIndex;
      this.dragColumnIndex = columnIndex;
    },

    // Dropping Task
    dropTask(taskIndex, columnIndex) {
      if (this.dragIndex !== null && this.dragColumnIndex !== null) {
        const draggedTask = this.columns[this.dragColumnIndex].tasks[this.dragIndex];
        this.columns[this.dragColumnIndex].tasks.splice(this.dragIndex, 1);
        this.columns[columnIndex].tasks.splice(taskIndex, 0, draggedTask);
        this.dragIndex = null;
        this.dragColumnIndex = null;
      }
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

/* Kanban Tasks */
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

.add-task-btn {
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s, transform 0.1s;
}

.add-task-btn:hover {
  background: #0056b3;
}

.add-task-btn:active {
  transform: scale(0.98);
}

/* Tags */
.task-tags {
  margin-top: 10px;
}

.tag {
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: bold;
  display: inline-block;
  margin: 3px;
}

button {
  margin-top: 5px;
  padding: 5px;
  border: none;
  background: #28a745;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #218838;
}
</style>
