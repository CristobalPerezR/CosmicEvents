-- Execute this one only after db_scheme.sql

INSERT INTO ca_country(country_name, country_sig)
    VALUES 
        ('Chile', 'CL'),
        ('Argentina', 'AR'),
        ('Peru', 'PE');

INSERT INTO ca_subdivision(subd_name, subd_country)
    VALUES 
        ('Libertador General Bernardo O''Higgins',  1),
        ('Los Rios', 1),
        ('Buenos Aires', 2),
        ('Cordoba', 2),
        ('Lima', 3),
        ('Cusco', 3);

INSERT INTO ca_city(city_name, city_sub)
    VALUES
        ('Rancagua', 1),
        ('San Fernando', 1),
        ('Valdivia', 2),
        ('La Union', 2),
        ('La Plata', 3),
        ('Mar del Plata', 3),
        ('Cordoba', 4),
        ('Villa Carlos Paz', 4),
        ('Lima', 5),
        ('Barranca', 5),
        ('Cusco', 6),
        ('Urubamba', 6);