pipeline {
    agent none

    parameters {
        choice(
            name: 'PROFILE',
            choices: ['normal', 'spike', 'stress', 'smoke', 'endurance'],
            description: 'Load test profile to run'
        )
        string(
            name: 'BASE_URL',
            defaultValue: 'http://localhost:8000',
            description: 'API endpoint to test'
        )
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        INFLUXDB_URL = 'http://100.200.100.200:8086/k6'
        K6_PROFILE = "${params.PROFILE}"
        K6_BASE_URL = "${params.BASE_URL}"
    }

    stages {
        stage('Prepare') {
            agent any
            steps {
                echo "Load Test Configuration:"
                echo "Profile: ${K6_PROFILE}"
                echo "Base URL: ${K6_BASE_URL}"
                echo "InfluxDB: ${INFLUXDB_URL}"
                echo "Running on 5 slave nodes in parallel"
            }
        }

        stage('Run Distributed Load Test') {
            steps {
                script {
                    def slaveNodes = [
                        'slave-1': '192.168.45.10',
                        'slave-2': '192.168.45.21',
                        'slave-3': '192.168.45.33',
                        'slave-4': '192.168.45.47',
                        'slave-5': '192.168.45.58'
                    ]

                    def parallelStages = slaveNodes.collectEntries { nodeLabel, nodeIP ->
                        [(nodeLabel): {
                            node(nodeLabel) {
                                echo "Running k6 test on ${nodeLabel} (${nodeIP})"
                                sh '''
                                    cd "${WORKSPACE}"
                                    k6 run \
                                        --out influxdb=${INFLUXDB_URL} \
                                        -e PROFILE=${K6_PROFILE} \
                                        -e BASE_URL=${K6_BASE_URL} \
                                        -e NODE_ID=${NODE_LABEL} \
                                        test.js
                                '''
                            }
                        }]
                    }

                    parallel(parallelStages)
                }
            }
        }

        stage('Report') {
            agent any
            steps {
                script {
                    echo "Load test completed on all 5 nodes"
                    echo "Results available in InfluxDB: ${INFLUXDB_URL}"
                    echo "Grafana dashboard: http://grafana-host:3000"
                }
            }
        }
    }

    post {
        always {
            echo "Test run finished"
        }
        success {
            echo "All nodes completed successfully"
        }
        failure {
            echo "One or more nodes failed"
        }
    }
}
