// TaskService.ts
export interface Task {
    id: number;
    title: string;
    description: string;
  }
  
  export async function getTasks(): Promise<Task[]> {
    const response = await fetch('/tasks');
    const data = await response.json();
    return data;
  }
  
  export async function createTask(task: Task): Promise<void> {
    await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
  }
  
  export async function updateTask(id: number, task: Task): Promise<void> {
    await fetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
  }
  
  export async function deleteTask(id: number): Promise<void> {
    await fetch(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }
  