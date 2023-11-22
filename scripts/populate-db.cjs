const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');

const prisma = new PrismaClient();

async function populateDatabase() {
  try {
    // Read the Buildings CSV file
    /**
       * @type {any[]}
       */
    const buildingsData = [];
    fs.createReadStream('buildings.csv')
      .pipe(csv())
      .on('data', (/** @type {any} */ row) => {
        buildingsData.push(row);
      })
      .on('end', async () => {
        // Populate the Buildings table
        const existingBuildings = await prisma.building.findMany({
          where: {
            name: { in: buildingsData.map((building) => building.name) },
          },
        });

        // Only add new buildings to the database
        const newBuildingsData = buildingsData.filter(
          (building) => !existingBuildings.some((/** @type {{ name: any; }} */ b) => b.name === building.name)
        );

        // Populate the Buildings table with new buildings
        if (newBuildingsData.length > 0) {
          await prisma.building.createMany({
            data: newBuildingsData.map((building) => ({
              name: building.name,
              address: building.address,
              amenities: building.amenities,
            })),
          });

          console.log('New buildings added to the database successfully!');
        } else {
          console.log('No new buildings to add.');
        }

        // Read the Leases CSV file
        /**
           * @type {any[]}
           */
        const leasesData = [];
        fs.createReadStream('leases.csv')
          .pipe(csv())
          .on('data', (/** @type {any} */ row) => {
            leasesData.push(row);
          })
          .on('end', async () => {
            // Map building names to building IDs
            const buildingIdMap = {};
            const existingBuildings = await prisma.building.findMany({
              where: {
                name: { in: buildingsData.map((building) => building.name) },
              },
            });
            // @ts-ignore
            existingBuildings.forEach((building) => {
              // @ts-ignore
              buildingIdMap[building.name] = building.id;
            });

            // Populate the Leases table
            await prisma.lease.createMany({
              data: leasesData.map((lease) => ({
                name: lease.name,
                bedroom_count: parseInt(lease.bedroom_count),
                bathroom_count: parseInt(lease.bathroom_count),
                sqft: parseInt(lease.sqft),
                rent: parseInt(lease.rent),
                // @ts-ignore
                building_name: lease.building_name,
                building_id: buildingIdMap[lease.building_name],
                signing_date: new Date(lease.signing_date),
                average_walk_time: parseInt(lease.average_walk_time),
                satisfaction_rating: parseFloat(lease.satisfaction_rating),
              })),
            });

            console.log('Leases data populated successfully!');
          });
      });
  } catch (error) {
    console.error('Error populating the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateDatabase();
