#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <unordered_set>
using namespace std;

int main() {
    int N, M;
     cin >> N >> M;

    vector<vector<int>> routes(M);
     unordered_map<int, vector<int>> stop_to_routes;

    for (int i = 0; i < M; ++i) {
      int K;
       cin >> K;
        routes[i].resize(K);
          for (int j = 0; j < K; ++j) {
            cin >> routes[i][j];
             stop_to_routes[routes[i][j]].push_back(i);
        }
    }

    int A, B;
     cin >> A >> B;

       if (A == B) {
        cout << 0 << endl;
         return 0;
    }

    queue<pair<int, int>> q;
     unordered_set<int> visited_stops;
     unordered_set<int> visited_routes;

    // Запускаем BFS с остановки A
    for (int route : stop_to_routes[A]) {
      q.push({route, 0});
       visited_routes.insert(route);
    }
      visited_stops.insert(A);

    while (!q.empty()) {
      auto [current_route, transfers] = q.front();
       q.pop();

        for (int stop : routes[current_route]) {
          if (stop == B) {
            cout << transfers << endl;
             return 0;
            }
            if (visited_stops.find(stop) == visited_stops.end()) {
              visited_stops.insert(stop);
                for (int next_route : stop_to_routes[stop]) {
                    if (visited_routes.find(next_route) == visited_routes.end()) {
                     q.push({next_route, transfers + 1});
                     visited_routes.insert(next_route);
                    }
                }
            }
        }
    }

    cout << "Call a taxi!" << endl;
    return 0;
}
