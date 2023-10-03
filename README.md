# Decision Engine <!-- omit from toc -->

**Table of Contents**
- [Summary](#summary)
- [System Architecture](#system-architecture)
- [Setup](#setup)
  - [Requirements](#requirements)
  - [Setup Steps](#setup-steps)
- [Usage](#usage)
  - [ConfigFrontend](#configfrontend)
  - [ExecutionEngine](#executionengine)

## Summary

The Decision Engine project empowers users to make well-informed decisions based on user-defined policies. The intuitive web-based interface enables non-technical users to effortlessly create, manage, and deploy their decision-making algorithms (decision policies) without requiring assistance from developers. The engine efficiently employs these policies to drive decision processes.

## System Architecture

The Decision Engine consists of four primary components: ExecutionEngine, Policy DB, ConfigBackend, and ConfigFrontend. These components collaborate to facilitate decision-making based on user-defined policies.

The system diagram below offers a visual representation of the architecture and the interactions among these components:

![System Diagram](https://github.com/ianguelman/decision-engine/assets/49989582/174f5f48-a8f4-4649-8402-5b65af1d8171)

This diagram provides a comprehensive overview of how the Decision Engine operates with its key components.

## Setup

This guide provides instructions on setting up the Decision Engine. Before you begin, please ensure that you have the following Requirements installed:

### Requirements

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

### Setup Steps

**Step 1: Clone this Repository**

```bash
git clone https://github.com/ianguelman/decision-engine
cd decision-engine
```

**Step 2: Build Docker Images**

Navigate to the root directory of the cloned repository and execute the following commands to build the required Docker images:

**Build the Execution Engine Image**

```bash
docker build ./execution_engine -t execution_engine
```

**Build the Config Frontend Image**

```bash
docker build ./config_frontend -t config_frontend
```

**Build the Config Backend Image**

```bash
docker build ./config_backend -t config_backend 
```

**Build the Compose**

```bash
docker-compose build 
```

## Usage

To start the Decision Engine, run the following command:

```bash
docker-compose up 
```

### ConfigFrontend

Accessible at `localhost:3000`, ConfigFrontend serves as the user-friendly interface for creating policies and defining decision criteria effortlessly.

![ConfigFrontend UI](https://github.com/ianguelman/decision-engine/assets/49989582/35b5afa3-3cdb-41a6-b01f-fc34c795b411)

You can use the "ADD DECISION BLOCK" button to create a new block and input the decision parameters. Enter the name of the property submitted in the JSON to the Execution Engine. Select the comparison signal (>, >=, ==, <, <>), and then enter the value to be compared. You can left-click on the blocks at any time to edit these properties. The "ADD RETURN BLOCK" button adds a new return block that needs to be configured with its value (true or false) to end the flow.

o create edges that define the flow, click, hold, and drag the right green handle to indicate the path when the node policy is true, and the left red arrow for when it's false. These arrows must be connected by dragging them to the top black handles of other decision or return blocks. To remove edges or blocks, select them and press the backspace key.

Use the "PUBLISH FLOW" button to publish the policy. The database and execution engines process the update instantly.

### ExecutionEngine

Available at `localhost:5001`. The ExecutionEngine provides the `/decide` route, which expects a JSON input with the properties defined in the ConfigFrontend and returns a JSON response with a boolean field (decision) representing the decision made based on the policy.

Request Example:

```JSON
{
  "age": 23,
  "income": 3000
}
```

Response Example:

```JSON
{
  "decision": true
}
```