process.stdin.resume();
process.stdin.setEncoding('utf-8');

let input = '';
process.stdin.on('data', function(chunk) {
 input += chunk;
});

process.stdin.on('end', function() {
  const lines = input.trim().split('\n');
  const [N, M] = lines[0].split(' ').map(Number);

    const routes = [];
    const stopToRoutes = new Map();

    for (let i = 1; i <= M; ++i) {
     const routeStops = lines[i].split(' ').slice(1).map(Number);
        routes.push(routeStops);
          for (const stop of routeStops) {
            if (!stopToRoutes.has(stop)) {
              stopToRoutes.set(stop, []);
            }
               stopToRoutes.get(stop).push(i - 1);
        }
    }

    const [A, B] = lines[M + 1].split(' ').map(Number);

      if (A === B) {
       console.log(0);
        return;
    }

    const queue = [];
     const visitedStops = new Set();
     const visitedRoutes = new Set();

    for (const route of (stopToRoutes.get(A) || [])) {
      queue.push([route, 0]);
       visitedRoutes.add(route);
         }
        visitedStops.add(A);

    while (queue.length > 0) {
     const [currentRoute, transfers] = queue.shift();

         for (const stop of routes[currentRoute]) {
            if (stop === B) {
                console.log(transfers);
                return;
               }
              if (!visitedStops.has(stop)) {
                visitedStops.add(stop);
                for (const nextRoute of (stopToRoutes.get(stop) || [])) {
                    if (!visitedRoutes.has(nextRoute)) {
                        queue.push([nextRoute, transfers + 1]);
                        visitedRoutes.add(nextRoute);
                    }
                }
            }
        }
    }

    console.log("Call a taxi!");
});
