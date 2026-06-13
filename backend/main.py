from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Allow frontend (React dev server on port 3000) to call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NodeData(BaseModel):
    id: str
    type: Optional[str] = None
    position: Optional[dict] = None
    data: Optional[dict] = None


class EdgeData(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class PipelineRequest(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]


def is_dag(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    """
    Check if the graph formed by nodes and edges is a directed acyclic graph (DAG).
    Uses Kahn's algorithm (topological sort via BFS).
    A graph is a DAG if and only if a topological ordering exists
    (i.e., all nodes can be processed).
    """
    # Build adjacency list and in-degree count
    node_ids = {n.id for n in nodes}
    adj = {nid: [] for nid in node_ids}
    in_degree = {nid: 0 for nid in node_ids}

    for edge in edges:
        if edge.source in adj and edge.target in adj:
            adj[edge.source].append(edge.target)
            in_degree[edge.target] += 1

    # Start with all nodes that have zero in-degree
    queue = [nid for nid, deg in in_degree.items() if deg == 0]
    visited_count = 0

    while queue:
        current = queue.pop(0)
        visited_count += 1
        for neighbor in adj[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If we visited all nodes, there are no cycles → it's a DAG
    return visited_count == len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag,
    }
